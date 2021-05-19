const {
  getAnswers,
  getCategories,
  getUserAnswers,
  getQuestions,
  getImage,
} = require("./service_endesha");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/endesha_repo");
let repo = require("../../data/endesha_repo");

jest.mock("sequelize");

describe("Categories -  Get Categories", () => {
  it("Should fail when category with id not found", async () => {
    //query supplied with the request
    let queryBody = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "cool name",
    };

    //mock value returned by function
    repo.getCategories.mockResolvedValue(Promise.resolve(null));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let err = helpers.buildError(
      errors.notFound,
      "Record not found",
      queryBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, err);
    await getCategories(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return single category with name is supplied", async () => {
    //query supplied with the request
    let queryBody = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "cool name",
    };
    let category = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "stk",
      description: "cool cat",
    };

    //mock value returned by function
    repo.getCategories.mockResolvedValue(Promise.resolve(category));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(category, []);
    await getCategories(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Answers -  Get Answers", () => {
  it("Anwer Should fail when invalid id is supplied", async () => {
    //query supplied with the request
    let queryBody = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595e",
      answer: "cool name",
    };

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let err = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + queryBody.id,
      queryBody,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, err);
    await getAnswers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Answers- should return empty array if empty array returned from repo", async () => {
    //query supplied with the request
    let queryBody = {};

    //mock value returned by function
    repo.getAnswers.mockResolvedValue(Promise.resolve([]));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse([], []);
    await getAnswers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("UserAnswers -  Get UserAnswers", () => {
  it("UserAnswers should return useranswer when correct id supplied", async () => {
    //query supplied with the request
    let queryBody = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };
    let data = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      answer: "cool name",
      user_id: "db48f03a-90f2-4a70-aa82-0f4256595ec9",
      question_id: "eb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };

    repo.getUserAnswers.mockResolvedValue(Promise.resolve(data));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(data, []);
    await getUserAnswers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("UserAnswers- Should return 500 when all fails", async () => {
    //query supplied with the request

    let queryBody = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };

    //mock value returned by function
    repo.getUserAnswers.mockResolvedValue(Promise.reject("Error"));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);

    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get User Answer:Error",
      {},
    );

    let expectedResponse = helpers.mockExpectedResponse({}, err);
    await getUserAnswers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Questions -  Get Questions", () => {
  it("Question should return an array when category id is supplied", async () => {
    //query supplied with the request
    let queryBody = {
      category_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };

    let data = [
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
        question: "cool name",
        category_id: "db48f03a-90f2-4a70-aa82-0f4256595ec9",
        answer_id: "eb48f03a-90f2-4a70-aa82-0f4256595ec9",
      },
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ec1",
        question: "cool name",
        category_id: "db48f03a-90f2-4a70-aa82-0f4256595ec2",
        answer_id: "eb48f03a-90f2-4a70-aa82-0f4256595ec3",
      },
    ];

    repo.getQuestions.mockResolvedValue(Promise.resolve(data));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(data, []);
    await getQuestions(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("UserAnswers- Should return 400 when answer id is invalid", async () => {
    //query supplied with the request

    let queryBody = {
      answer_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec",
    };

    let data = {
      id: undefined,
      category_id: undefined,
      question: undefined,
      answer_id: "cb48f03a-90f2-4a70-aa82-0f4256595ec",
    };

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);

    let err = helpers.buildError(
      errors.invalidUUID,
      "Invalid UUID " + queryBody.answer_id,
      data,
    );

    let expectedResponse = helpers.mockExpectedResponse({}, err);
    await getQuestions(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Image -  Get Image", () => {
  it("Image, return bad request when image not found", async () => {
    //query supplied with the request
    let queryBody = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
    };
    let data = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: undefined,
    };

    repo.getImages.mockResolvedValue(Promise.resolve(null));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);

    let err = helpers.buildError(errors.notFound, "Image not found", data);
    let expectedResponse = helpers.mockExpectedResponse({}, err);
    await getImage(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
