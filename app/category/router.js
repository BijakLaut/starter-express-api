var express = require("express");
const {
   index,
   viewCreate,
   actionCreate,
   viewEdit,
   actionEdit,
   actionDelete,
} = require("./controller");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.get("/edit/:id", viewEdit);
router.post("/create", actionCreate);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actionDelete);

module.exports = router;
