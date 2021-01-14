const usersService = require('../users/users.service');

module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersService.validate(username, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.signupUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersService.create(username, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
