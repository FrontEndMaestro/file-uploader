const fileModel = require("../model/fileModel");

async function getFileUpload(req, res) {
  const { folders } = await fileModel.getAllFoldersFiles(req.user.id);
  res.render("uploadFiles", { folders });
}

async function postFileUpload(req, res) {
  const folder = req.body.folderId == "none" ? null : req.body.folderId;
  let url = `/files/${req.file.filename}`;
  const timeAdded = new Date().toLocaleString();
  await fileModel.storeFile(
    url,
    req.file.originalname,
    folder,
    req.file.size / (1024 * 1024) + " mb",
    timeAdded,
  );
  res.redirect("/");
}

async function postFolderCreate(req, res) {
  await fileModel.createFolder(req.body.folderName, req.user.id);
  res.redirect("/");
}

async function getUpdateFolder(req, res) {
  const folder = await fileModel.getFolderById(req.params.folderId);
  res.render("updateFolder", { folder });
}

async function postUpdateFolder(req, res) {
  let folderId = req.params.folderId;
  let folderName = req.body.folderName;
  await fileModel.updateFolder(folderId, folderName);
  res.redirect("/");
}

async function deleteFolder(req, res) {
  await fileModel.deleteFolder(req.params.folderId);
  return res.status(200).send();
}

async function deleteFile(req, res) {
  await fileModel.deleteFile(req.params.fileId);
  return res.status(200).send();
}

async function getDetails(req, res) {
  let fileData = await fileModel.getFile(req.params.fileId);
  res.render("fileDetails", { file: fileData });
}

module.exports = {
  getFileUpload,
  postFileUpload,
  postFolderCreate,
  deleteFolder,
  deleteFile,
  getUpdateFolder,
  postUpdateFolder,
  getDetails,
};
