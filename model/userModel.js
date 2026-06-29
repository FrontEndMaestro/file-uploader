const prismaClient = require("../lib/prisma");

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

module.exports = { createUser };
