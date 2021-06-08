// npm test -- --testPathPattern=deleting
const {
  addCategory,
  addQuestion,
  addUserAnswer,
  addAnswer,
  uploadImage,
} = require("./service_endesha");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/endesha_repo");
jest.mock("../../data/baseRepo");
let repo = require("../../data/endesha_repo");
let userRepo = require("../../data/baseRepo");
jest.mock("sequelize");

it("Categories-should return 400 when category name is not supplied", async () => {
  //query supplied with the request
  let body = {};
  let data = { name: undefined };
  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});

  let errs = helpers.buildError(
    errors.catNameRequired,
    "Category name is required",
    data,
  );

  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addCategory(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Category - should return 400 when category name already exists", async () => {
  //query supplied with the request
  let body = { name: "CoolCategory" };

  repo.categoryExists.mockResolvedValue(Promise.resolve(true));

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.catExists,
    "Category already exist",
    body,
  );
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addCategory(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Answer - should return 400 when answer and answer descriptions are not provided", async () => {
  //query supplied with the request
  let body = {};
  let data = { short_description: undefined, answer: undefined };

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.answerDescriptionRequired,
    "Answer description required",
    data,
  );
  errs = helpers.addError(errs, errors.answerRequired, "Answer required", data);
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addAnswer(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Answer - should return 400 when description already exists", async () => {
  //query supplied with the request
  let body = { short_description: "CoolDescription", answer: "Cool Answer" };

  repo.answerExists.mockResolvedValue(Promise.resolve(true));

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.answerExists,
    "Answer already exist",
    body,
  );
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addAnswer(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("UserAnswer - should return 400 for no data provided", async () => {
  //query supplied with the request
  let body = {};
  let data = { user_id: undefined, question_id: undefined, answer: undefined };

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.userIDRequired,
    "User ID  required",
    data,
  );
  errs = helpers.addError(
    errs,
    errors.questionIDRequired,
    "Question ID required",
    data,
  );
  errs = helpers.addError(errs, errors.answerRequired, "Answer required", data);

  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addUserAnswer(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("UserAnswer - should return 400 when user_id and question_id does not exist", async () => {
  //query supplied with the request
  let body = {
    user_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
    question_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bee",
    answer: "Cool Answer ",
  };

  repo.questionExists.mockResolvedValue(Promise.resolve(false));
  userRepo.userExists.mockResolvedValue(Promise.resolve(false));

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.questionNotFound,
    "Question not found",
    body,
  );
  errs = helpers.addError(errs, errors.userNotExists, "User not found", body);
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addUserAnswer(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Question - should return 400 for no data provided", async () => {
  //query supplied with the request
  let body = {};
  var data = {
    question: undefined,
    category_id: undefined,
    answer_id: undefined,
    answer: undefined,
    description: undefined,
  };

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.questionRequired,
    "Question is Required",
    data,
  );

  errs = helpers.addError(
    errs,
    errors.categoryRequired,
    "Category is required",
    data,
  );
  errs = helpers.addError(errs, errors.answerRequired, "Answer required", data);
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addQuestion(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Question - should return 400 when category, answer not found", async () => {
  //query supplied with the request
  let body = {
    category_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
    answer_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bee",
    question: "Cool Question ",
  };

  let data = {
    category_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
    answer_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bee",
    question: "Cool Question ",
    answer: undefined,
    description: undefined,
  };
  repo.categoryExists.mockResolvedValue(Promise.resolve(false));
  repo.questionExists.mockResolvedValue(Promise.resolve(true));
  repo.answerExists.mockResolvedValue(Promise.resolve(false));

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.categoryNotFound,
    "Category not found",
    data,
  );
  errs = helpers.addError(
    errs,
    errors.questionExists,
    "Question already exists",
    data,
  );
  errs = helpers.addError(
    errs,
    errors.answerNotFound,
    "Answer not found",
    data,
  );
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await addQuestion(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Image - should return 400 for no image or name supplied", async () => {
  //query supplied with the request
  let body = {};
  var data = {
    name: undefined,
  };

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  let errs = helpers.buildError(
    errors.fileRequired,
    "An image is required",
    data,
  );

  errs = helpers.addError(
    errs,
    errors.fileNameRequired,
    "File name is required",
    data,
  );
  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await uploadImage(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

it("Image - should return 400 when image name already exists", async () => {
  //query supplied with the request
  let body = {
    name: "Cool Image",
  };

  let data = {
    name: "Cool Image",
  };
  repo.fileExists.mockResolvedValue(Promise.resolve(true));

  //use interceptors to  mock req and response values
  const res = mockResponse();
  const req = mockRequest(body, {}, {});
  req.file = "some cool binary file";
  let errs = helpers.buildError(
    errors.fileNameExist,
    "File name already exists",
    data,
  );

  let expectedResponse = helpers.mockExpectedResponse({}, errs);
  await uploadImage(req, res);

  //make sure the right status and response are emitted
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});
