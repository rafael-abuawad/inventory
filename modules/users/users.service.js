const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

module.exports.find = async () => {
  const users = await prisma.user.findMany({}).then((data) =>
    data.map((user) => ({
      id: user.id,
      username: user.username,
    }))
  );
  return users;
};

module.exports.findById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return { id: user.id, username: user.username };
};

module.exports.findProfile = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      items: true,
      locations: true,
    },
  });
  return { id: user.id, username: user.username };
};

module.exports.create = async (username, password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const user = await prisma.user.create({
    data: { username: username.trim().toLowerCase(), hash },
  });
  if (user) {
    return { id: user.id, username: user.username };
  }
  throw new Error('Username already taken');
};

module.exports.validate = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: { username: username.trim().toLowerCase() },
  });
  if (user) {
    const valid = bcrypt.compareSync(password, user.hash);
    if (valid) {
      return { id: user.id, username: user.username };
    }
    throw new Error('Wrong password');
  }
  throw new Error("User doen't exists");
};
