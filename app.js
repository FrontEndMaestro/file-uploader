require("dotenv").config();

const express = require("express");
const app = express();
//const pool = require("./model/dbconnection");
const session = require("express-session");
const passport = require("passport");
const localStratgy = require("passport-local").Strategy;
const path = require("node:path");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./lib/prisma");

const authRouter = require("./route/authRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
      dbModel: "Session",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //cookie expires after one day
    },
  }),
);

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", authRouter);

app.use((err, req, res, next) => {
  console.warn(err);
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App is listening at http://localhost:3000");
});
