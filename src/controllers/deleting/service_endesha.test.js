const {
  deleteCategory,
  deleteAnswer,
  deleteUserAnswer,
  deleteImage,
  deleteQuestion,
} = require("./service_endesha");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/endesha_repo");
let repo = require("../../data/endesha_repo");

jest.mock("sequelize");
describe("Category Delete Category", () => {
  it("Category - Should call baseRepo's deleteUser and return success", async () => {
    //body supplied with the request
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };

    //mock value returned by function
    repo.deleteCategory.mockResolvedValue(Promise.resolve(reqBody.id));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(reqBody);
    let expectedResponse = helpers.mockExpectedResponse(reqBody.id, []);
    await deleteCategory(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595e" };
    errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + reqBody.id,
      reqBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deleteCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Answers Delete Answers", () => {
  it("Category - Should call baseRepo's deleteUser and return success", async () => {
    //body supplied with the request
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };

    //mock value returned by function
    repo.deleteAnswer.mockResolvedValue(Promise.resolve(reqBody.id));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(reqBody);
    let expectedResponse = helpers.mockExpectedResponse(reqBody.id, []);
    await deleteAnswer(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595e" };
    errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + reqBody.id,
      reqBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deleteAnswer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("UserAnwers Delete user answers", () => {
  it("UserAnwers - Should call repo's UserAnwers and return success", async () => {
    //body supplied with the request
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };

    //mock value returned by function
    repo.deleteUserAnswer.mockResolvedValue(Promise.resolve(reqBody.id));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(reqBody);
    let expectedResponse = helpers.mockExpectedResponse(reqBody.id, []);
    await deleteUserAnswer(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595e" };
    errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + reqBody.id,
      reqBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deleteUserAnswer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Question Delete Questions ", () => {
  it("Question - Should call repo's Question and return success", async () => {
    //body supplied with the request
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };

    //mock value returned by function
    repo.deleteUserAnswer.mockResolvedValue(Promise.resolve(reqBody.id));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(reqBody);
    let expectedResponse = helpers.mockExpectedResponse(reqBody.id, []);
    await deleteQuestion(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595e" };
    errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + reqBody.id,
      reqBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deleteQuestion(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Image Delete Image ", () => {
  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595e" };
    errs = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + reqBody.id,
      reqBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deleteImage(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
