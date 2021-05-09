import { InvalidOptionArgumentError, Command } from "commander";
import fs from "fs";

export class Parser {
  /**
   *  Parses params
   *
   * @typedef {Object} Options
   * @property {number} shift
   * @property {string} input
   * @property {string} output
   * @property {string} action - encode/decode
   *
   * @param {*} env
   * @returns {Options}
   */
  parse(env) {
    const program = new Command();
    program.version("0.0.1");

    program
      .requiredOption(
        "-s, --shift <shift value>, a shift",
        undefined,
        this._checkNumber
      )
      .option("-i, --input <file path>, an input file")
      .option("-o, --output <file path>, an output file")
      .requiredOption(
        "-a, --action <action name>, an action encode/decode",
        undefined,
        this._checkAction
      );

    program.parse(process.argv);

    let options = program.opts();
    if (!options.hasOwnProperty("input")) {
      options.input = undefined;
    }
    if (!options.hasOwnProperty("output")) {
      options.output = undefined;
    }

    return options;
  }

  /**
   * @param {*} value
   * @returns
   */
  _checkNumber(value) {
    const parsed = parseInt(value);
    if (parsed.toString() !== value) {
      throw new InvalidOptionArgumentError("Must be a number.");
    }
    return parsed;
  }

  /**
   * @param {*} value
   * @returns
   */
  _checkAction(value) {
    if (value !== "encode" && value !== "decode") {
      throw new InvalidOptionArgumentError(
        'An action should be "encode or decode"'
      );
    }
    return value;
  }
}
