import express from 'express';
import {
  createPost, updatePost, deletePost, getPosts, getPost,
} from '../controllers/postController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { uploadPostImage } from '../middlewares/localUpload.js';

const router = express.Router();

// Public
router.get('/', getPosts);
router.get('/:id', getPost);

// Admin only (credentials via body or headers)
router.post('/', adminOnly, uploadPostImage.single('image'), createPost);
router.put('/:id', adminOnly, uploadPostImage.single('image'), updatePost);
router.delete('/:id', adminOnly, deletePost);

export default router;