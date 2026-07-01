const fileModel = require("../model/fileModel");

async function getHome(req, res) {
  const { folders, filesWithoutFolder } = await fileModel.getAllFoldersFiles(
    req.user.id,
  );
 
  res.render("home", { user: req.user, folders, filesWithoutFolder });
}

module.exports = { getHome };
