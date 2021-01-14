const usersService = require('../users/users.service');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersService.validate(username, password);
    const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET);

    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports.signupUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersService.create(username, password);
    const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET);

    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports.getProfile = async (req, res, next) => {
  const userId = req.user.sub;
  if (userId) {
    try {
      const user = await usersService.findProfile(req.user.sub);
      res.json(user);
    } catch (err) {
      next(err);
    }
  } else {
    next({ name: 'Error', message: 'Token has no useful data' });
  }
};
