import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { ItemController } from './items.controller';

const uploads = multer({
  limits: { fileSize: 1024 * 1024 * 3 },
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, 'uploads/items');
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
const router = Router();
const itemController = new ItemController();

router
  .route('/')
  .get(itemController.getAllItems)
  .post(uploads.single('item'), itemController.createItem);

router
  .route('/:id')
  .get(itemController.getItemById)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
