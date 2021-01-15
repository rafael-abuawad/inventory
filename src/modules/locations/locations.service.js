const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.find = async (ownerId) => {
  const locations = await prisma.location.findMany({ where: { ownerId } });
  return locations;
};

module.exports.findById = async (id) => {
  const location = await prisma.location.findUnique({
    where: { id },
    include: { items: true },
  });
  return location;
};

module.exports.create = async (title, description, ownerId) => {
  const location = await prisma.location.create({
    data: {
      title,
      description,
      owner: { connect: { id: ownerId } },
    },
  });
  return location;
};

module.exports.update = async (id, title, description, ownerId) => {
  let location = await prisma.location.findUnique({ where: { id } });

  if (location.ownerId == ownerId) {
    location = await prisma.location.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    return location;
  }
  throw new Error("User isn't authorized to update the location");
};

module.exports.delete = async (id, ownerId) => {
  const location = await prisma.location.findUnique({ where: { id } });

  if (location.ownerId == ownerId) {
    const location = await prisma.location.delete({
      where: {
        id,
      },
    });
    return location;
  }
  throw new Error("User isn't authorized to delete the location");
};
