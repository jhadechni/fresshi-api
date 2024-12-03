import { Router } from 'express';
import { getData } from '../controllers/dataController';
import {
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts
  } from '../controllers/dataController';

const router = Router();

router.get('/ordenes', getData);
router.get('/products', getAllProducts);
router.post('/create/products', createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);

export default router;