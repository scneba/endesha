const repo = require("../../data/endesha_repo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");
const uuid = require("uuid");

exports.getCategories = async function (req, res) {
  try {
    let id = req.query.id;
    let name = req.query.name;
    let data = { id, name };
    let errs = validateID(id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    let cats = await repo.getCategories(id, name);
    helpers.writeSuccess(res, cats);
    return;
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get Categories:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};

exports.getAnswers = async function (req, res) {
  try {
    let id = req.query.id;
    let description = req.query.short_description;
    let answer = req.query.answer;
    let data = { id, description, answer };
    let errs = validateID(id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    let ans = await repo.getAnswers(id, description, answer);
    helpers.writeSuccess(res, ans);
    return;
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get answers:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};

exports.getUserAnswers = async function (req, res) {
  try {
    let id = req.query.id;
    let user_id = req.query.user_id;
    let question_id = req.query.question_id;
    let data = { id, user_id, question_id };
    let errs = validateID(id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    errs = validateID(user_id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    errs = validateID(question_id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    let ans = await repo.getUserAnswers(id, user_id, question_id);
    helpers.writeSuccess(res, ans);
    return;
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get User Answer:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};

exports.getQuestions = async function (req, res) {
  try {
    let id = req.query.id;
    let category_id = req.query.user_id;
    let answer_id = req.query.answer_id;
    let question = req.query.question;
    let data = { id, category_id, answer_id, question };
    let errs = validateID(id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    errs = validateID(category_id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    errs = validateID(answer_id, data);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    let ans = await repo.getQuestions(id, category_id, answer_id, question);
    helpers.writeSuccess(res, ans);
    return;
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get question:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};

const validateID = function (id, data) {
  let errs = [];
  if (id && id.length > 0) {
    let valid = uuid.validate(id);
    if (!valid) {
      errs = helpers.addError(
        errs,
        errors.invalidUUID,
        "Invalid UUID " + id,
        data,
      );
    }
  }

  return errs;
};
