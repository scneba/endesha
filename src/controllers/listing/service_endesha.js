const repo = require("../../data/endesha_repo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

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
    if (cats == null) {
      writeRecordNotFound(res, data);
      return;
    }
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
    if (ans == null) {
      writeRecordNotFound(res, data);
      return;
    }
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
    if (ans == null) {
      writeRecordNotFound(res, data);
      return;
    }
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

    let quest = await repo.getQuestions(id, category_id, answer_id, question);
    if (quest == null) {
      writeRecordNotFound(res, data);
      return;
    }
    helpers.writeSuccess(res, quest);
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

exports.getImage = async function (req, res) {
  let name = req.query.name;
  let id = req.query.id;
  let data = { id, name };
  let errs = validateID(id, data);
  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }
  let image = await repo.getImages(id, name);
  if (image == null) {
    errs = helpers.buildError(errors.notFound, "Image not found", data);
    helpers.writeBadRequest(res, errs);
    return;
  } else if (Array.isArray(image)) {
    helpers.writeSuccess(res, image);
  } else {
    //single image with path, render the image
    let fullPath = path.join(__basedir, "storage/images/" + image.path);
    // Checking if the path exists
    console.log(fullPath);
    fs.exists(fullPath, function (exists) {
      if (!exists) {
        errs = helpers.buildError(errors.notFound, "Image not found", data);
        helpers.writeBadRequest(res, errs);
        return;
      }

      // Extracting file extension
      var ext = path.extname(image.path);

      // Setting default Content-Type
      var contentType = "text/plain";

      // Checking if the extention of
      // image is '.png'
      if (ext === ".png") {
        contentType = "image/png";
      }

      // Setting the headers
      res.writeHead(200, {
        "Content-Type": contentType,
      });

      // Reading the file
      fs.readFile(fullPath, function (err, content) {
        // Serving the image
        res.end(content);
      });
    });
  }
  return;
};

const writeRecordNotFound = function (res, data) {
  let err = helpers.buildError(errors.notFound, "Record not found", data);
  helpers.writeBadRequest(res, err);
};
