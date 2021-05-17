const repo = require("../../data/endesha_repo");
const userRepo = require("../../data/baseRepo");
const uuid = require("uuid");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

exports.updateImage = async function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let file = req.file;
  var data = { id, name };
  try {
    let errs = await validateFile(file, id, name);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let image = await repo.updateFile(id, name, file.filename);
    helpers.writeSuccess(res, image);
  } catch (e) {
    console.log(e);
  }
};

const validateFile = async function (file, id, name) {
  let data = { id, name };
  let errs = [];
  if (file == null) {
    errs = helpers.buildError(
      errors.fileRequired,
      "An image is required",
      data,
    );
  }
  if ((id == null || id.length == 0) && (name == null || name.length == 0)) {
    errs = helpers.addError(
      errs,
      errors.fileNameorIdRequired,
      "Name or ID required for update",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }

  try {
    let found = await repo.fileExists(id, name);
    if (!found) {
      errs = helpers.buildError(errors.fileNotFound, "File not found", data);
    }
  } catch (e) {
    throw e;
  }
  return errs;
};
exports.updateCategory = async function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let description = req.body.description;
  var data = { id, name, description };
  try {
    let errs = await validateCategory(id, name, description);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let cat = await repo.updateCategory(id, name, description);
    helpers.writeSuccess(res, cat);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to Update category: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateCategory(id, name, description) {
  let data = { id, name, description };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    return errs;
  }

  try {
    let found = await repo.categoryExists(id);
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.idNotFound,
        "Category ID not found " + id,
        data,
      );
      return errs;
    }
    //if there is a name, make sure it is unique
    if (name && name.length > 0) {
      found = await repo.categoryExists(id, name);
      if (found) {
        errs = helpers.buildError(
          errors.catExists,
          "Category name already exist",
          data,
        );
      }
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

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

exports.updateAnswer = async function (req, res) {
  let id = req.body.id;
  let description = req.body.short_description;
  let answer = req.body.answer;
  var data = { id, description, answer };
  try {
    let errs = await validateAnswer(id, description, answer);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let ans = await repo.updateAnswer(id, description, answer);
    console.log(ans);
    helpers.writeSuccess(res, ans);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to Update Answer: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};
async function validateAnswer(id, description, answer) {
  let data = { id, description, answer };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    return errs;
  }

  try {
    let found = await repo.answerExists(id, "");
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.idNotFound,
        "Answer ID not found",
        data,
      );
      return errs;
    }

    if (description && description.length > 0) {
      found = await repo.answerExists(id, description);
      if (found) {
        errs = helpers.addError(
          errs,
          errors.answerExists,
          "Answer description already exist",
          data,
        );
      }
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

exports.updateUserAnswer = async function (req, res) {
  try {
    let id = req.body.id;
    let answer = req.body.answer;
    var data = { id, answer };
    let errs = await validateUserAnswer(id, answer);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let resp = await repo.updateUserAnswer(id, "", "", answer);
    console.log(resp);
    helpers.writeSuccess(res, resp);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to Update User answer: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateUserAnswer(id, answer) {
  let data = { id, answer };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    return errs;
  }

  if (answer == null || answer.length == 0) {
    errs = helpers.addError(
      errs,
      errors.answerRequired,
      "Answer required",
      data,
    );
  }
  try {
    let found = await repo.userAnswerExists(id);
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.userAnswerNotFound,
        "Answer with ID not found: " + id,
        data,
      );
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

exports.updateQuestion = async function (req, res) {
  try {
    let id = req.body.id;
    let question = req.body.question;
    let category_id = req.body.category_id;
    let answer_id = req.body.answer_id;

    var data = { id, question, category_id, answer_id };
    let errs = await validateQuestion(id, question, category_id, answer_id);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let savedQuestion = await repo.updateQuestion(
      id,
      question,
      category_id,
      answer_id,
    );
    helpers.writeSuccess(res, savedQuestion);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save Question: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateQuestion(id, question, category_id, answer_id) {
  let data = { id, question, category_id, answer_id };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    return errs;
  }
  let found = repo.questionExists(id);
  if (!found) {
    errs = helpers.addError(
      errs,
      errors.idNotFound,
      "Question ID not found: " + id,
      data,
    );
    return errs;
  }

  try {
    if (question && question.length > 0) {
      //check that the question update is not alreay in db
      found = repo.questionExists(id, question);
      if (found) {
        errs = helpers.addError(
          errs,
          errors.questionExists,
          "Question already exists in db",
          data,
        );
      }
    }
    if (errs.length > 0) {
      return errs;
    }
    if (category_id && category_id.length > 0) {
      let found = await repo.categoryExists(category_id, "");
      if (!found) {
        errs = helpers.addError(
          errs,
          errors.categoryNotFound,
          "Category not found",
          data,
        );
      }
    }
    //check answer_id exists
    if (answer_id && answer_id.length > 0) {
      found = await repo.answerExists(answer_id, "");
      if (!found) {
        errs = helpers.addError(
          errs,
          errors.answerNotFound,
          "Answer not found",
          data,
        );
      }
    }

    if (errs.length > 0) {
      return errs;
    }
  } catch (e) {
    throw e;
  }
  return errs;
}
