const uuid = require("uuid");
const repo = require("../../data/endesha_repo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");
var fs = require("fs");
const path = require("path");

exports.deleteCategory = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await repo.deleteCategory(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

exports.deleteAnswer = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await repo.deleteAnswer(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

exports.deleteUserAnswer = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await repo.deleteUserAnswer(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

exports.deleteQuestion = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await repo.deleteQuestion(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

exports.deleteImage = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    let image = await repo.getImages(id);
    if (image) {
      try {
        let fullPath = path.join(__basedir, "storage/images/" + image.path);
        fs.unlinkSync(fullPath);
        await repo.deletePicture(id);
      } catch (e) {
        console.log(e);
      }
    }
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

//validate a UUID
const validateID = function (id, data) {
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
