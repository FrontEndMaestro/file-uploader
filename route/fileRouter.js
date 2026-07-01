const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controller/fileController");
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { ensureAuthentication } = require("../config/authMiddleware");

fileRouter.get("/upload", ensureAuthentication, fileController.getFileUpload);
fileRouter.post(
  "/upload",
  ensureAuthentication,
  upload.single("file"),
  fileController.postFileUpload,
);

fileRouter.delete("/deleteFile/:fileId", fileController.deleteFile);
fileRouter.delete("/deleteFolder/:folderId", fileController.deleteFolder);

fileRouter.get("/updateFolder/:folderId", fileController.getUpdateFolder);
fileRouter.post("/updateFolder/:folderId", fileController.postUpdateFolder);
fileRouter.post("/createFolder", fileController.postFolderCreate);
fileRouter.get("/details/:fileId", fileController.getDetails);
module.exports = fileRouter;
