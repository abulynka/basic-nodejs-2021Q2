import * as fs from "fs";

export class FileAccess {
  /**
   * @param {String} path
   */
  async checkFullRead(path) {
    await this._exists(path);
    await this._hasReadAcces(path);
    await this._isFile(path);
  }

  /**
   * @param {String} path
   */
  async checkFullWrite(path) {
    await this._exists(path);
    await this._hasWriteAccess(path);
    await this._isFile(path);
  }

  /**
   * @param {String} path
   */
  async _exists(path) {
    await fs.promises.access(path, fs.constants.F_OK).catch((err) => {
      throw "File " + path + " doesn't exist";
    });
  }

  /**
   * @param {String} path
   */
  async _hasReadAcces(path) {
    await fs.promises.access(path, fs.constants.R_OK).catch((err) => {
      throw "Read access denied (" + path + ")!";
    });
  }

  /**
   * @param {String} path
   */
  async _hasWriteAccess(path) {
    await fs.promises.access(path, fs.constants.W_OK).catch((err) => {
      throw "Write access denied (" + path + ")!";
    });
  }

  /**
   * @param {String} path
   */
  async _isFile(path) {
    await fs.promises
      .lstat(path)
      .then((stat) => {
        if (!stat.isFile()) {
          throw "Path " + path + " is not a file!";
        }
      })
      .catch((err) => {
        throw "Path " + path + " is not a file!";
      });
  }
}
