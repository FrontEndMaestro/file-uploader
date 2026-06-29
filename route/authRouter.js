const { Router } = require("express");
const authRouter = Router();
const authControlller = require("../controller/authController");

authRouter.get("/signup", authControlller.getSignUp);
authRouter.post("/signup", authControlller.postSignUp);

module.exports = authRouter;
