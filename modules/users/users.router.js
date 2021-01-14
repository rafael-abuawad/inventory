const { Router } = require('express');
const usersController = require('./users.controller');
const router = Router();

router.route('/').get(usersController.findAllUsers);

router.route('/:id').get(usersController.findUserById);

module.exports = router;
