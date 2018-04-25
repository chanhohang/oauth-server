const ErrorUtil = require("../../util/ErrorUtil");

class DuplicateUserError extends Error {
  constructor(userId) {
    super();
    this.userId = userId;
    this.code = ErrorUtil.DuplicateUserError;
    this.message = this.message || userId + ' is already existed.';
  }
}

export default DuplicateUserError;
