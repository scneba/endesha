// npm test -- --testPathPattern=deleting
const {
  updateAnswer,
  updateCategory,
  updateQuestion,
  updateUserAnswer,
  updateImage,
} = require("./service_endesha");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");
jest.mock("../../data/endesha_repo");
let repo = require("../../data/endesha_repo");
jest.mock("sequelize");

describe("Category Updating Category tests)", () => {
  it("Category - Should fail when id is not supplied", async () => {
    //query supplied with the request
    let body = {};
    let data = { id: undefined, name: undefined, description: undefined };
    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(errors.idRequired, "ID is required", data);
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateCategory(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Category Should fail when category name already exists", async () => {
    //query supplied with the request
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "Exists",
      description: "Cool description",
    };

    repo.categoryExists
      .mockResolvedValueOnce(Promise.resolve(true))
      .mockResolvedValueOnce(Promise.resolve(true));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.catExists,
      "Category name already exist",
      body,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateCategory(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Answer Updating Answer tests)", () => {
  it("Answer - Should fail when id is invalid not supplied", async () => {
    //query supplied with the request
    let body = { id: "osnoneonsoneos" };
    let data = {
      id: "osnoneonsoneos",
      answer: undefined,
      description: undefined,
    };
    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + body.id,
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateAnswer(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Category Should fail when category name already exists", async () => {
    //query supplied with the request
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      answer: "already Exists",
      short_description: "Cool description",
    };

    repo.answerExists
      .mockResolvedValueOnce(Promise.resolve(true))
      .mockResolvedValueOnce(Promise.resolve(true));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.answerExists,
      "Answer description already exist",
      body,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateAnswer(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("UserAnswer Updating UserAnswer tests)", () => {
  it("Answer - Should fail for id not found and empty answer", async () => {
    //query supplied with the request
    let body = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let data = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      answer: undefined,
    };
    repo.userAnswerExists.mockResolvedValueOnce(Promise.resolve(false));
    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.answerRequired,
      "Answer required",
      data,
    );
    errs = helpers.addError(
      errs,
      errors.userAnswerNotFound,
      "Answer with ID not found: " + body.id,
      data,
    );

    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateUserAnswer(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("UserAnswer Should throw 500 when repo fails", async () => {
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      answer: "Correct name",
    };
    repo.userAnswerExists.mockResolvedValueOnce(Promise.resolve(true));
    repo.updateUserAnswer.mockResolvedValueOnce(Promise.reject("Oops"));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.internalServerErr,
      "Unable to Update User answer: Oops",
      body,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateUserAnswer(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Questions Updating UserAnswer tests)", () => {
  it("Answer - Should fail when question id not found", async () => {
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      question: "Cool question",
      answer_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      category_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };
    repo.questionExists.mockResolvedValueOnce(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.idNotFound,
      "Question ID not found: " + body.id,
      body,
    );

    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateQuestion(req, res);
    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
  it("Answer - Should category and answer don't exist", async () => {
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      question: "Cool question",
      answer_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      category_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };
    repo.questionExists.mockResolvedValueOnce(Promise.resolve(true));
    repo.questionExists.mockResolvedValueOnce(Promise.resolve(false));
    repo.categoryExists.mockResolvedValueOnce(Promise.resolve(false));
    repo.answerExists.mockResolvedValueOnce(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.categoryNotFound,
      "Category not found",
      body,
    );
    errs = helpers.addError(
      errs,
      errors.answerNotFound,
      "Answer not found",
      body,
    );

    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateQuestion(req, res);
    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Imiage Updating Image tests)", () => {
  it("Image - Should fail id and name are empty", async () => {
    let body = {};
    let data = {
      id: undefined,
      name: undefined,
    };

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    req.file = "Cool file";
    let errs = helpers.buildError(
      errors.fileNameorIdRequired,
      "Name or ID required for update",
      data,
    );

    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateImage(req, res);
    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
  it("Image - fail when id/name not found", async () => {
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "Cool question",
    };
    repo.fileExists.mockResolvedValueOnce(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    req.file = "Cool file";
    let errs = helpers.buildError(errors.fileNotFound, "File not found", body);
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateImage(req, res);
    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
