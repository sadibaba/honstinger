import express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/commentController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/', addComment);       
router.get('/:postId', getComments);
router.delete('/:id', adminOnly, deleteComment); 

export default router;