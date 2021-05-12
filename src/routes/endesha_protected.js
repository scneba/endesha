var express = require("express");
var router = express.Router();
var registeringController = require("../controllers/registering/service_endesha");
var updateController = require("../controllers/updating/service_endesha");

router.post("/categories", registeringController.addCategory);
router.patch("/categories", updateController.updateCategory);
router.post("/answers", registeringController.addAnswer);
router.patch("/answers", updateController.updateAnswer);
router.post("/useranswers", registeringController.addUserAnswer);
router.patch("/useranswers", updateController.updateUserAnswer);
router.post("/questions", registeringController.addQuestion);
router.patch("/questions", updateController.updateQuestion);
module.exports = router;
