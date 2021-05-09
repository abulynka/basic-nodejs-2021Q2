export class Caesar {
  /**
   * Constructor
   */
  constructor() {
    this._shift = 0;

    this._alphabetArrLower = [...Array(26)].map((q, w) =>
      String.fromCharCode(w + 97)
    );

    this._alphabetArrUpper = [...Array(26)].map((q, w) =>
      String.fromCharCode(w + 65)
    );

    this._alphabetArrLowerObj = {};
    this._alphabetArrLower.forEach((v, k) => {
      this._alphabetArrLowerObj[v] = k;
    });

    this._alphabetArrUpperObj = {};
    this._alphabetArrUpper.forEach((v, k) => {
      this._alphabetArrUpperObj[v] = k;
    });
  }

  /**
   * @param {number} shift
   */
  set shift(shift) {
    this._shift = shift;
  }

  /**
   * Encodes input data
   *
   * @param {string} plain
   * @returns
   */
  encode(plain) {
    let result = "";
    plain.split("").forEach((e) => {
      result += this._getChar(e, this._shift);
    });
    return result;
  }

  /**
   * Decodes input data
   *
   * @param {string} encoded
   * @returns
   */
  decode(encoded) {
    let result = "";
    encoded.split("").forEach((e) => {
      result += this._getChar(e, 26 - this._shift);
    });
    return result;
  }

  /**
   * @param {string} input
   * @param {number} shift
   * @returns
   */
  _getChar(input, shift) {
    const currentShift = (26 + (shift % 26)) % 26;

    if (this._alphabetArrLowerObj.hasOwnProperty(input)) {
      const currentPosition = this._alphabetArrLowerObj[input];
      return this._alphabetArrLower[(currentShift + currentPosition) % 26];
    }

    if (this._alphabetArrUpperObj.hasOwnProperty(input)) {
      const currentPosition = this._alphabetArrUpperObj[input];
      return this._alphabetArrUpper[(currentShift + currentPosition) % 26];
    }

    return input;
  }
}
