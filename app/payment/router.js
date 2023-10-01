var express = require("express");
const {
   index,
   paymentViewCreate,
   paymentActionCreate,
   paymentViewEdit,
   paymentActionEdit,
   paymentActionDelete,
   changeStatus,
} = require("./controller");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.get("/create", paymentViewCreate);
router.post("/create", paymentActionCreate);
router.get("/edit/:id", paymentViewEdit);
router.put("/edit/:id", paymentActionEdit);
router.delete("/delete/:id", paymentActionDelete);
router.put("/status/:id", changeStatus);

module.exports = router;
