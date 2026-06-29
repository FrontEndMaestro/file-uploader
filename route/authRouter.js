const { Router } = require("express");
const authRouter = Router();
const authControlller = require("../controller/authController");
const passport = require("passport");

authRouter.get("/signup", authControlller.getSignUp);
authRouter.post("/create", authControlller.postSignUp);
authRouter.get("/login", authControlller.getLogin);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
);

authRouter.get("/logout", authControlller.logOut);

module.exports = authRouter;
