var express = require("express");
var router = express.Router();
var registeringController = require("../controllers/registering/service_endesha");
var updateController = require("../controllers/updating/service_endesha");
var listController = require("../controllers/listing/service_endesha");
var deleteController = require("../controllers/deleting/service_endesha");

router.post("/categories", registeringController.addCategory);
router.patch("/categories", updateController.updateCategory);
router.get("/categories", listController.getCategories);
router.delete("/categories", deleteController.deleteCategory);

router.post("/answers", registeringController.addAnswer);
router.patch("/answers", updateController.updateAnswer);
router.get("/answers", listController.getAnswers);
router.delete("/answers", deleteController.deleteAnswer);

router.post("/useranswers", registeringController.addUserAnswer);
router.patch("/useranswers", updateController.updateUserAnswer);
router.get("/useranswers", listController.getUserAnswers);
router.delete("/useranswers", deleteController.deleteUserAnswer);

router.post("/questions", registeringController.addQuestion);
router.patch("/questions", updateController.updateQuestion);
router.get("/questions", listController.getQuestions);
router.delete("/questions", deleteController.deleteQuestion);
module.exports = router;
