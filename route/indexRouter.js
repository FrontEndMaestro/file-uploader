const { Router } = require("express");
const indexRouter = Router();
const indexControlller = require("../controller/indexController");
const { ensureAuthentication } = require("../config/authMiddleware");

indexRouter.get("/", ensureAuthentication, indexControlller.getHome);

module.exports = indexRouter;
