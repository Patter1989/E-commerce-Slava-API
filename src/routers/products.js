//src/routers/products.js
import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  patchProductController,
  upsertProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use(authenticate);

// Маршрут для отримання всіх продуктів з можливістю пошуку
router.get('/', ctrlWrapper(getProductsController));

// Маршрут для отримання конкретного продукту за ID
router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

// Маршрут для створення нового продукту
router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

// Маршрут для видалення продукту за ID
router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

// Маршрут для оновлення або створення продукту за ID (upsert)
router.put('/:productId', isValidId, ctrlWrapper(upsertProductController));

// Маршрут для часткового оновлення продукту за ID
router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductSchema),
  ctrlWrapper(patchProductController),
);

export default router;
