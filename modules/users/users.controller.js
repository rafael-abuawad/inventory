const usersService = require('./users.service');

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {
    const user = await usersService.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
