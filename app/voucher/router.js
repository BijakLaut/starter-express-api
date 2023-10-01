var express = require("express");
const {
   index,
   viewCreate,
   voucherCreate,
   voucherViewEdit,
   voucherEdit,
   voucherDelete,
   changeStatus,
} = require("./controller");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { isLogin } = require("../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post(
   "/create",
   multer({ dest: os.tmpdir() }).single("thumbnail"),
   voucherCreate
);
router.get("/edit/:id", voucherViewEdit);
router.put(
   "/edit/:id",
   multer({ dest: os.tmpdir() }).single("thumbnail"),
   voucherEdit
);
router.delete("/delete/:id", voucherDelete);
router.put("/status/:id", changeStatus);

module.exports = router;
