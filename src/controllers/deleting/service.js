const uuid = require("uuid");
const baseRepo = require("../../data/baseRepo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

/**
 * Delete user
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteUser = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let valid = uuid.validate(id);
  if (!valid) {
    let errs = helpers.buildError("INVALID_UUID", "Invalid UUID", data);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deleteUser(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

/**
 * Delete Role
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteRole = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let valid = uuid.validate(id);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", data);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deleteRole(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

exports.deleteRolePermission = async function (req, res) {
  let roleID = req.body.role_id;
  let permissionID = req.body.permission_id;
  let data = { role_id: roleID, permission_id: permissionID };
  let valid = uuid.validate(roleID);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", roleID);
    helpers.writeBadRequest(res, errs);
    return;
  }
  valid = uuid.validate(permissionID);
  if (!valid) {
    let errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID",
      permissionID,
    );
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deleteRolePermission(roleID, permissionID);
    helpers.writeSuccess(res, permissionID);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

exports.deleteUserRole = async function (req, res) {
  let roleID = req.body.role_id;
  let userID = req.body.user_id;
  let data = { role_id: roleID, user_id: userID };
  let valid = uuid.validate(roleID);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", roleID);
    helpers.writeBadRequest(res, errs);
    return;
  }
  valid = uuid.validate(userID);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", userID);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deleteUserRole(userID, roleID);
    helpers.writeSuccess(res, roleID);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

/**
 * Delete permission
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deletePermission = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let valid = uuid.validate(id);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", data);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deletePermission(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};
