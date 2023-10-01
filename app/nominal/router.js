var express = require("express");
const {
   index,
   viewCreate,
   nominalCreate,
   nominalViewEdit,
   nominalEdit,
   itemDelete,
} = require("./controller");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", nominalCreate);
router.get("/edit/:id", nominalViewEdit);
router.put("/edit/:id", nominalEdit);
router.delete("/delete/:id", itemDelete);

module.exports = router;
