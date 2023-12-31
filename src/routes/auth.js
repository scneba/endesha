var express = require("express");
var router = express.Router();
var registeringController = require("../controllers/registering/service");
var listingController = require("../controllers/listing/service");
router.post("/login", registeringController.login);
router.post("/logout", registeringController.logout);
router.get("/currentUser", listingController.getCurrentUser);
module.exports = router;
