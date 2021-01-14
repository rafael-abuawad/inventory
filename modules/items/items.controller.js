const itemsService = require('./items.service');

module.exports.getAllItems = async (req, res, next) => {
  try {
    const { sub } = req.user;
    const items = await itemsService.find(sub);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

module.exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await itemsService.findById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

module.exports.createItem = async (req, res, next) => {
  try {
    const { name, description, color, size, locationId } = req.body;
    const { sub } = req.user;
    const item = await itemsService.create(
      name,
      description,
      color,
      size,
      sub,
      locationId
    );
    res.json(item);
  } catch (err) {
    next(err);
  }
};

module.exports.updateItem = async (req, res, next) => {
  try {
    const { name, description, color, size, locationId } = req.body;
    const { sub } = req.user;
    const { id } = req.params;
    const item = await itemsService.update(
      id,
      name,
      description,
      color,
      size,
      sub,
      locationId
    );
    res.json(item);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  try {
    const { sub } = req.user;
    const { id } = req.params;
    const item = await itemsService.delete(id, sub);
    res.json(item);
  } catch (err) {
    next(err);
  }
};
