var express = require("express");
const { index, actionStatus } = require("./controller");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.put("/status", actionStatus);

module.exports = router;
