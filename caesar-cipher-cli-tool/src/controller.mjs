import { Parser } from "./parser.mjs";
import { TransformStream } from "./transform_stream.mjs";
import { pipeline } from "stream";
import { FileAccess } from "./file_access.mjs";
import * as fs from "fs";

export class Controller {
  async run() {
    const options = new Parser().parse(process.env);

    let iStream = null;
    let oStream = null;

    if (options.input) {
      await new FileAccess().checkFullRead(options.input);
      iStream = fs.createReadStream(options.input, { highWaterMark: 4096 });
    } else {
      iStream = process.stdin;
      console.log("Enter your message:");
    }

    if (options.output) {
      await new FileAccess().checkFullWrite(options.output);
      oStream = fs.createWriteStream(options.output, {
        highWaterMark: 4096,
        flags: "a",
      });
    } else {
      oStream = process.stdout;
    }

    const tStream = new TransformStream(
      { highWaterMark: 4096 },
      options.shift,
      options.action
    );

    pipeline(iStream, tStream, oStream, (err) => {
      // error
      if (err) {
        throw err;
      }
      if (oStream === process.stdout) {
        // move console cursor to next line
        console.error("");
      }
    });
  }
}
