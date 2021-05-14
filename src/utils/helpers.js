const uuid = require("uuid");
/**
 *Start a new error array with first error params
 * @param {string} errCode
 * @param {string} errMsg
 * @param {Object} data JSON data  to send back to user
 * @returns Array of error objects
 */
exports.buildError = function (errCode, errMsg, data = "") {
  let errs = [];
  errs.push({ err_code: errCode, msg: errMsg, data });
  return errs;
};
/**
 *Add an error to an already existing error list
 * @param {Array} errors Errors to append to
 * @param {string} errCode
 * @param {string} errMsg
 * @param {Object} data JSON data  to send back to user
 * @returns Array of error objects
 */
exports.addError = function (errors, errCode, errMsg, data = "") {
  if (Array.isArray(errors)) {
    errors.push({ err_code: errCode, msg: errMsg, data });
    return errors;
  } else {
    let errs = [];
    errs.push({ err_code: errCode, msg: errMsg, data });
    return errs;
  }
};

/**
 *Write a response msg  to http
 * @param {Object} res
 * @param {Object} data
 * @param {Object} errors
 * @param {number} statusCode
 */
const writeResponse = function (res, data, errors, statusCode) {
  try {
    res.status(statusCode);
    res.json({ data, errors });
  } catch (e) {
    console.log(e);
  }
};
exports.writeResponse = writeResponse;
exports.writeSuccess = function (res, data, errors = []) {
  writeResponse(res, data, errors, 200);
};
exports.writeCreated = function (res, data, errors = []) {
  writeResponse(res, data, errors, 201);
};
exports.writeBadRequest = function (res, errs) {
  writeResponse(res, {}, errs, 400);
};
exports.writeServerError = function (res, errs = {}) {
  writeResponse(res, {}, errs, 500);
};

/**
 *  Write expected response for mock tests
 * @param {*} data
 * @param {*} errors
 * @returns  object of data and errors
 */
exports.mockExpectedResponse = (data, errors) => ({
  data,
  errors,
});

//validate a UUID
exports.validateID = function (id, data) {
  let errs = [];
  if (id == null || id.length == 0) {
    errs = helpers.buildError(errors.idRequired, "ID is required", data);
    return errs;
  }

  let valid = uuid.validate(id);
  if (!valid) {
    errs = helpers.addError(
      errs,
      errors.invalidUUID,
      "Invalid UUID " + id,
      data,
    );
  }

  return errs;
};
