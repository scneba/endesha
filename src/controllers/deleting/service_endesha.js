const uuid = require("uuid");
const repo = require("../../data/endesha_repo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

exports.deleteCategory = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let errs = helpers.validateID(id, data);
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
  let errs = helpers.validateID(id, data);
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
  let errs = helpers.validateID(id, data);
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
  let errs = helpers.validateID(id, data);
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
