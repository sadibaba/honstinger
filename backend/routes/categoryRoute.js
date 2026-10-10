import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryControllers.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', adminOnly, createCategory);

export default router;