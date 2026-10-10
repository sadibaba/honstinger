import express from 'express';
import {
  createPost, updatePost, deletePost, getPosts, getPost,
} from '../controllers/postController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Public
router.get('/', getPosts);
router.get('/:id', getPost);

// Admin only — multer ki zaroorat nahi
router.post('/', adminOnly, createPost);
router.put('/:id', adminOnly, updatePost);
router.delete('/:id', adminOnly, deletePost);

export default router;