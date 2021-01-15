import { PrismaClient } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export class ItemService {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async find(owner: string) {
    const items = await this.prisma.item.findMany({
      where: { ownerId: owner },
    });
    return items;
  }

  async findById(id: string) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    return item;
  }

  async create(createItemDto: CreateItemDto, owner: string) {
    const item = await this.prisma.item.create({
      data: {
        ...createItemDto,
        owner: { connect: { id: owner } },
        location: { connect: { id: createItemDto.location } },
      },
    });
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto, owner: string) {
    let item = await this.prisma.item.findUnique({ where: { id } });

    if (item && item.ownerId == owner) {
      try {
        item = await this.prisma.item.update({
          where: {
            id,
          },
          data: {
            ...updateItemDto,
            location: { connect: { id: updateItemDto.location } },
          },
        });
        return item;
      } catch (err) {
        throw new Error(err);
      }
    }
    throw new Error("User isn't authorized to update the item");
  }

  async delete(id: string, owner: string) {
    let item = await this.prisma.item.findUnique({ where: { id } });

    if (item && item.ownerId == owner) {
      const item = await this.prisma.item.delete({ where: { id } });
      return item;
    }
    throw new Error("User isn't authorized to delete the item");
  }
}
