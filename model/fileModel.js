const { prisma } = require("../lib/prisma.js");

async function storeFile(fileUrl, filename, folderId, fileSize, Date) {
  if (folderId != null) {
    await prisma.file.create({
      data: {
        url: fileUrl,
        folderId: parseInt(folderId),
        name: filename,
        timeAdded: Date,
        size: fileSize,
      },
    });
  } else {
    await prisma.file.create({
      data: {
        url: fileUrl,
        name: filename,
        timeAdded: Date,
        size: fileSize,
      },
    });
  }
}

async function getFolderById(folderId) {
  const folder = await prisma.folder.findUnique({
    where: { id: parseInt(folderId) },
  });
  return folder;
}

async function createFolder(folderName, userId) {
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: userId,
    },
  });
}

async function getAllFoldersFiles(userId) {
  const folders = await prisma.folder.findMany({
    where: { userId },
    include: { files: true },
  });
  const filesWithoutFolder = await prisma.file.findMany({
    where: { folderId: null },
  });

  return { folders, filesWithoutFolder };
}

async function deleteFolder(folderId) {
  const deleteFiles = prisma.file.deleteMany({
    where: {
      folderId: parseInt(folderId),
    },
  });

  const deletefolder = prisma.folder.deleteMany({
    where: {
      id: parseInt(folderId),
    },
  });

  const transaction = prisma.$transaction([deleteFiles, deletefolder]);
}

async function updateFolder(folderId, folderName) {
  const folder = await prisma.folder.update({
    where: {
      id: parseInt(folderId),
    },
    data: { name: folderName },
  });
}

async function deleteFile(fileId) {
  const deleteFile = await prisma.file.delete({
    where: {
      id: parseInt(fileId),
    },
  });
}

async function getFile(fileId) {
  const file = await prisma.file.findUnique({
    where: {
      id: parseInt(fileId),
    },
  });
  return file;
}

module.exports = {
  storeFile,
  createFolder,
  getAllFoldersFiles,
  deleteFile,
  deleteFolder,
  getFolderById,
  updateFolder,
  getFile,
};
