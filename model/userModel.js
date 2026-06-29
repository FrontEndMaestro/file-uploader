const { prisma } = require("../lib/prisma.js");

async function createUser(data) {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

  return user;
}

async function findUser(data) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  return user;
}

async function findUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}
module.exports = { createUser, findUser, findUserById };
