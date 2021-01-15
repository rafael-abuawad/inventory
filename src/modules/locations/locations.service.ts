import { PrismaClient } from '@prisma/client';

export class LocationService {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async find(owner: string) {
    const locations = await this.prisma.location.findMany({
      where: { ownerId: owner },
    });
    return locations;
  }

  async findById(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: { items: true },
    });
    return location;
  }

  async create(title: string, description: string, owner: string) {
    const location = await this.prisma.location.create({
      data: {
        title,
        description,
        owner: { connect: { id: owner } },
      },
    });
    return location;
  }

  async update(id: string, title: string, description: string, owner: string) {
    let location = await this.prisma.location.findUnique({ where: { id } });

    if (location && location.ownerId == owner) {
      location = await this.prisma.location.update({
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
  }

  async delete(id: string, owner: string) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (location && location.ownerId == owner) {
      const location = await this.prisma.location.delete({
        where: {
          id,
        },
      });
      return location;
    }
    throw new Error("User isn't authorized to delete the location");
  }
}
