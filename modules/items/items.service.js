const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.find = async (ownerId) => {
  const items = await prisma.item.findMany({ where: { ownerId } });
  return items;
};

module.exports.findById = async (id) => {
  const item = await prisma.item.findUnique({ where: { id } });
  return item;
};

module.exports.create = async (
  name,
  description,
  color,
  size,
  ownerId,
  locationId
) => {
  const item = await prisma.item.create({
    data: {
      name,
      description,
      color,
      size,
      owner: { connect: { id: ownerId } },
      location: { connect: { id: locationId } },
    },
  });
  return item;
};

module.exports.update = async (
  id,
  name,
  description,
  color,
  size,
  ownerId,
  locationId
) => {
  let item = await prisma.item.findUnique({ where: { id } });

  if (item.ownerId == ownerId) {
    try {
      item = await prisma.item.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          color,
          size,
          location: { connect: { id: locationId } },
        },
      });
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }
  throw new Error("User isn't authorized to update the item");
};

module.exports.delete = async (id, ownerId) => {
  let item = await prisma.item.findUnique({ where: { id } });

  if (item.ownerId == ownerId) {
    const item = await prisma.item.delete({ where: { id } });
    return item;
  }
  throw new Error("User isn't authorized to delete the item");
};
