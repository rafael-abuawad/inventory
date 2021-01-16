import { Request, Response, NextFunction } from 'express';
import { LocationService } from './locations.service';

export class LocationController {
  constructor(
    private locationService: LocationService = new LocationService()
  ) {}

  getAllLocations = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { sub } = req.user;
      const locations = await this.locationService.find(sub);
      res.json(locations);
    } catch (err) {
      next(err);
    }
  };

  getLocationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const location = await this.locationService.findById(id);
      res.json(location);
    } catch (err) {
      next(err);
    }
  };

  createLocation = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      const owner = req.user.sub;

      const location = await this.locationService.create(
        title,
        description,
        owner
      );
      res.json(location);
    } catch (err) {
      next(err);
    }
  };

  updateLocation = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      const { id } = req.params;
      const owner = req.user.sub;

      const location = await this.locationService.update(
        id,
        title,
        description,
        owner
      );
      res.json(location);
    } catch (err) {
      next(err);
    }
  };

  deleteLocation = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const owner = req.user.sub;

      const location = await this.locationService.delete(id, owner);
      res.json(location);
    } catch (err) {
      next(err);
    }
  };
}
