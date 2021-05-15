var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
  limits: {
    fileSize: 10000000,
  },
});

var upload = multer({ storage: storage });

var registeringController = require("../controllers/registering/service_endesha");
var updateController = require("../controllers/updating/service_endesha");
var listController = require("../controllers/listing/service_endesha");
var deleteController = require("../controllers/deleting/service_endesha");

router.post(
  "/images",
  upload.single("image"),
  registeringController.uploadImage,
);

router.patch("/images", upload.single("image"), updateController.updateImage);
router.get("/images", listController.getImage);
router.delete("/images", deleteController.deleteImage);

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
