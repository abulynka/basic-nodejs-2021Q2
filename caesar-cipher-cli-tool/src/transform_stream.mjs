import { Caesar } from "./caesar.mjs";
import { Transform } from "stream";

export class TransformStream extends Transform {
  /**
   * @param {Object} opt
   * @param {Number} shift
   * @param {('encode'|'decode')} operation
   */
  constructor(opt, shift, operation) {
    super(opt);

    this._caesar = new Caesar();
    this._caesar.shift = shift;

    this._operation = operation;
  }

  _transform(chunk, encoding, callback) {
    try {
      const str = chunk.toString();

      if (this._operation === "encode") {
        callback(null, this._caesar.encode(str));
      } else {
        callback(null, this._caesar.decode(str));
      }
    } catch (err) {
      callback(err);
    }
  }
}
