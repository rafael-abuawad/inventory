const { Router } = require('express');
const multer = require('multer');
const itemsController = require('./items.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/items');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploads = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: fileFilter,
});
const router = Router();

router
  .route('/')
  .get(itemsController.getAllItems)
  .post(uploads.single('item'), itemsController.createItem);

router
  .route('/:id')
  .get(itemsController.getItemById)
  .put(itemsController.updateItem)
  .delete(itemsController.deleteItem);

module.exports = router;
