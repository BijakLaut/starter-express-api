var express = require("express");
const {
   index,
   bankViewCreate,
   actionCreate,
   bankViewEdit,
   bankActionEdit,
   bankActionDelete,
} = require("./controller");
var router = express.Router();
const { isLogin } = require("../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.get("/create", bankViewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", bankViewEdit);
router.put("/edit/:id", bankActionEdit);
router.delete("/delete/:id", bankActionDelete);

module.exports = router;
