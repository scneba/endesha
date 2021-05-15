const repo = require("../../data/endesha_repo");
const userRepo = require("../../data/baseRepo");
const uuid = require("uuid");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

exports.uploadImage = async function (req, res) {
  let file = req.file;
  let name = req.body.name;
  let data = { name };
  try {
    let errs = await validateFile(file, name);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    let image = await repo.addImage(name, file.filename);
    helpers.writeCreated(res, image);
  } catch (e) {
    console.log(e);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save image: " + e,
      data,
    );
    helpers.writeServerError(res, err);
  }
};
const validateFile = async function (file, name) {
  let data = { name };
  let errs = [];
  if (file == null) {
    errs = helpers.buildError(
      errors.fileRequired,
      "An image is required",
      data,
    );
  }
  if (name == null || name.length == 0) {
    errs = helpers.addError(
      errs,
      errors.fileNameRequired,
      "File name is required",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }

  try {
    let found = await repo.fileExists("", name);
    if (found) {
      errs = helpers.buildError(
        errors.fileNameExist,
        "File name already exists",
        data,
      );
    }
  } catch (e) {
    throw e;
  }
  return errs;
};
exports.addCategory = async function (req, res) {
  try {
    let name = req.body.name;
    let description = req.body.description;
    var data = { name, description };
    let errs = await validateCategory(name, description);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let cat = await repo.addCategory(name, description);
    helpers.writeCreated(res, cat);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save category: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateCategory(name, description) {
  let data = { name, description };
  let errs = [];
  if (name == null || name.length == 0) {
    errs = helpers.buildError(
      errors.catNameRequired,
      "Category name is required",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await repo.categoryExists("", name);
    if (found) {
      errs = helpers.buildError(
        errors.catExists,
        "Category already exist",
        data,
      );
      return errs;
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

exports.addAnswer = async function (req, res) {
  try {
    let description = req.body.short_description;
    let answer = req.body.answer;
    var data = { short_description: description, answer: answer };
    let errs = await validateAnswer(description, answer);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let ans = await repo.addAnswer(description, answer);
    helpers.writeCreated(res, ans);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save answer: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateAnswer(description, answer) {
  let data = { short_description: description, answer: answer };
  let errs = [];
  if (description == null || description.length == 0) {
    errs = helpers.buildError(
      errors.answerDescriptionRequired,
      "Answer description required",
      data,
    );
  }
  if (answer == null || answer.length == 0) {
    errs = helpers.addError(
      errs,
      errors.answerRequired,
      "Answer required",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await repo.answerExists("", description);
    if (found) {
      errs = helpers.buildError(
        errors.answerExists,
        "Answer already exist",
        data,
      );
      return errs;
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

exports.addUserAnswer = async function (req, res) {
  try {
    let user_id = req.body.user_id;
    let question_id = req.body.question_id;
    let answer = req.body.answer;
    var data = { user_id, question_id, answer };
    let errs = await validateUserAnswer(user_id, question_id, answer);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let found = repo.userAnswerExists("", user_id, question_id);
    let resp;
    //I'd prefer to get the id and update by it
    if (found) {
      resp = await repo.updateUserAnswer("", user_id, question_id, answer);
    } else {
      resp = await repo.addUserAnswer(user_id, question_id, answer);
    }
    helpers.writeCreated(res, resp);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save User answer: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateUserAnswer(user_id, question_id, answer) {
  let data = { user_id, question_id, answer };
  let errs = [];
  if (user_id == null || user_id.length == 0) {
    errs = helpers.addError(
      errs,
      errors.userIDRequired,
      "User ID  required",
      data,
    );
  }
  if (question_id == null || question_id.length == 0) {
    errs = helpers.addError(
      errs,
      errors.questionIDRequired,
      "Question ID required",
      data,
    );
  }
  if (answer == null || answer.length == 0) {
    errs = helpers.addError(
      errs,
      errors.answerRequired,
      "Answer required",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await repo.questionExists(question_id, "");
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.questionNotFound,
        "Question not found",
        data,
      );
    }

    found = await userRepo.userExists(user_id, "", "");
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.userNotExists,
        "User not found",
        data,
      );
    }
    if (errs.length > 0) {
      return errs;
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

exports.addQuestion = async function (req, res) {
  try {
    let question = req.body.question;
    let category_id = req.body.category_id;
    let answer_id = req.body.answer_id;
    let answer = req.body.answer;
    let description = req.body.description;

    var data = { question, category_id, answer_id, answer, description };
    let errs = await validateQuestion(
      question,
      category_id,
      answer_id,
      answer,
      description,
    );
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    answerID = answer_id;
    if (answer && answer.length > 0) {
      let ans = await repo.addAnswer(description, answer);
      answerID = ans.id;
    }
    let savedQuestion = await repo.addQuestion(question, category_id, answerID);
    helpers.writeCreated(res, savedQuestion);
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

/**
 *
 * @param {*} question
 * @param {*} category_id
 * @param {*} answer_id
 * @param {*} answer
 * @returns
 *
 * Every question should be registered with its answer or an answer id should be supplied
 * Category is also required
 */
async function validateQuestion(
  question,
  category_id,
  answer_id,
  answer,
  description,
) {
  let data = { question, category_id, answer_id, answer, description };
  let errs = [];
  if (question == null || question.length == 0) {
    errs = helpers.addError(
      errs,
      errors.questionRequired,
      "Question is Required",
      data,
    );
  }
  if (category_id == null || category_id.length == 0) {
    errs = helpers.addError(
      errs,
      errors.categoryRequired,
      "Category is required",
      data,
    );
  }
  if (
    (description == null || description.length == 0) &&
    (answer_id == null || answer_id.length == 0)
  ) {
    errs = helpers.addError(
      errs,
      errors.answerRequired,
      "Answer required",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await repo.categoryExists(category_id, "");
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.categoryNotFound,
        "Category not found",
        data,
      );
    }

    found = await repo.questionExists("", question);
    if (found) {
      errs = helpers.addError(
        errs,
        errors.questionExists,
        "Category not found",
        data,
      );
    }

    //answer id must be provided or the answer and it's description provided
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
    } else {
      //verify answer with description does not exist
      if (answer == null || answer.length == 0) {
        errs = helpers.addError(
          errs,
          errors.answerRequired,
          "Answer is required",
          data,
        );
      }

      found = await repo.answerExists("", description);
      if (found) {
        errs = helpers.addError(
          errs,
          errors.answerExists,
          "Answer description already exists",
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
