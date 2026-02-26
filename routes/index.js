const router = require("express").Router();
const articleRouter = require("./articles");

const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

const { getNewsByKeyword } = require("../controllers/news");

const {
  validateUserBody,
  validateLoginBody,
} = require("../middlewares/validation");

const userRouter = require("./users");

router.post("/signin", validateLoginBody, login);
router.post("/signup", validateUserBody, createUser);

router.get("/news", getNewsByKeyword);

router.use(auth);
router.use("/articles", articleRouter);
router.use("/users", userRouter);

module.exports = router;
