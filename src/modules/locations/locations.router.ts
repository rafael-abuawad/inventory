import { Router } from 'express';
import { LocationController } from './locations.controller';
const locationController = new LocationController();
const router = Router();

router
  .route('/')
  .get(locationController.getAllLocations)
  .post(locationController.createLocation);

router
  .route('/:id')
  .get(locationController.getLocationById)
  .put(locationController.updateLocation)
  .delete(locationController.deleteLocation);

export default router;
