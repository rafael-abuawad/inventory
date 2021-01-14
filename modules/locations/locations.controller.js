const locationsService = require('./locations.service');

module.exports.getAllLocations = async (req, res, next) => {
  try {
    const { sub } = req.user;
    const locations = await locationsService.find(sub);
    res.json(locations);
  } catch (err) {
    next(err);
  }
};

module.exports.getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await locationsService.findById(id);
    res.json(location);
  } catch (err) {
    next(err);
  }
};

module.exports.createLocation = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { sub } = req.user;
    
    const location = await locationsService.create(title, description, sub);
    res.json(location);
  } catch (err) {
    next(err);
  }
};

module.exports.updateLocation = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const { sub } = req.user;

    const location = await locationsService.update(id, title, description, sub);
    res.json(location);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sub } = req.user;

    const location = await locationsService.delete(id, sub);
    res.json(location);
  } catch (err) {
    next(err);
  }
};
