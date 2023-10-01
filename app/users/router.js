var express = require("express");
const { viewSignIn, actionSignIn, actionLogout } = require("./controller");
var router = express.Router();

router.get("/", viewSignIn);
router.post("/", actionSignIn);
router.get("/logout", actionLogout);

module.exports = router;
