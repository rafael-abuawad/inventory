const { Router } = require('express');
const locationsController = require('./locations.controller');
const router = Router();

router
  .route('/')
  .get(locationsController.getAllLocations)
  .post(locationsController.createLocation);

// prettier-ignore
router
  .route('/:id')
  .get(locationsController.getLocationById)
  .put(locationsController.updateLocation)
  .delete(locationsController.deleteLocation)

module.exports = router;
