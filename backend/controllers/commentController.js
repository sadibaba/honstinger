import { Comment } from '../models/index.js';

export const addComment = async (req, res) => {
  try {
    const { postId, content, authorName } = req.body;
    if (!content?.trim()) return res.status(400).json({ message: 'Content required' });

    const comment = await Comment.create({
      postId,
      content: content.trim(),
      authorName: authorName?.trim() || 'Anonymous',
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      order: [['createdAt', 'DESC']],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Not found' });
    await comment.destroy();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};