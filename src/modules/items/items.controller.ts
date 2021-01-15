import { Request, Response, NextFunction } from 'express';
import { ItemService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export class ItemController {
  constructor(private itemService: ItemService = new ItemService()) {}

  getAllItems = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { sub } = req.user;
      const items = await this.itemService.find(sub);
      res.json(items);
    } catch (err) {
      next(err);
    }
  };

  getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const item = await this.itemService.findById(id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  };

  createItem = async (req: any, res: Response, next: NextFunction) => {
    if (req.file && req.user) {
      try {
        const { name, description, color, size, location } = req.body;
        const owner = req.user.sub;
        const imagePath = '/' + req.file.path.replace(/\\/g, '/');

        const createItemDto: CreateItemDto = {
          name,
          description,
          imagePath,
          color,
          size,
          location,
        };
        const item = await this.itemService.create(createItemDto, owner);
        res.json(item);
      } catch (err) {
        next(err);
      }
    } else {
      next({
        name: 'File required',
        message: 'The item picture is a required field',
      });
    }
  };

  updateItem = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { name, description, color, size, location } = req.body;
      const { id } = req.params;
      const owner = req.user.sub;

      const updateItemDto: UpdateItemDto = {
        name,
        description,
        color,
        size,
        location,
      };
      const item = await this.itemService.update(id, updateItemDto, owner);
      res.json(item);
    } catch (err) {
      next(err);
    }
  };

  deleteItem = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const owner = req.user.sub;
      const item = await this.itemService.delete(id, owner);
      res.json(item);
    } catch (err) {
      next(err);
    }
  };
}
