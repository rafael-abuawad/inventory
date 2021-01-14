const { Router } = require('express');
const itemsController = require('./items.controller');
const router = Router();

router
  .route('/')
  .get(itemsController.getAllItems)
  .post(itemsController.createItem);

router
  .route('/:id')
  .get(itemsController.getItemById)
  .put(itemsController.updateItem)
  .delete(itemsController.deleteItem);

module.exports = router;
