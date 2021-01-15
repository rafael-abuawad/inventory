import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async find() {
    const users = await this.prisma.user
      .findMany({ select: { id: true, username: true } })
      .then((data) =>
        data.map((user) => ({
          id: user.id,
          username: user.username,
        }))
      );
    return users;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true },
    });
    return user;
  }

  async findProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        items: true,
        locations: true,
      },
    });

    if (user) {
      const { hash, ...data } = user;
      return data;
    }
    throw new Error('An error ocurred retriving the profile');
  }

  async create(username: string, password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);
    const user = await this.prisma.user.create({
      data: { username: username.trim().toLowerCase(), hash: passwordHash },
      select: { id: true, username: true },
    });

    if (user) {
      return user;
    }
    throw new Error('Username already taken');
  }

  async validate(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username.trim().toLowerCase() },
    });

    if (user && user.hash) {
      const valid = bcrypt.compareSync(password, user.hash);
      if (valid) {
        const { hash, ...data } = user;
        return data;
      }
      throw new Error('Wrong password');
    }
    throw new Error("User doen't exists");
  }
}
