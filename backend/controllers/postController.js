import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Post, Comment } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteLocalFile = async (relativePath) => {
  if (!relativePath) return;
  try {
    await fs.unlink(path.join(__dirname, '..', relativePath));
  } catch (err) {
    console.warn('File delete failed:', relativePath);
  }
};

// CREATE POST (admin only via middleware)
export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, excerpt, imageUrl } = req.body;   // 👈 imageUrl add kiya


    if (!title?.trim()) return res.status(400).json({ success: false, message: 'Title required' });
    if (!content?.trim()) return res.status(400).json({ success: false, message: 'Content required' });
    if (!category?.trim()) return res.status(400).json({ success: false, message: 'Category required' });

    let slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const existing = await Post.findOne({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const postData = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || content.trim().substring(0, 150),
      category: category.trim(),
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean)) : [],
      slug,
      imageUrl: imageUrl?.trim() || null,   // 👈 YE ZAROORI HAI
    };

    // (Ye purana local upload ka code hai — agar file upload chahiye to rakho, warna hata do)
    if (req.file) postData.imageUrl = `/uploads/posts/${req.file.filename}`;

    const post = await Post.create(postData);
    return res.status(201).json({ success: true, post });
  } catch (error) {
    console.error('Create error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const { title, content, category, tags, excerpt, imageUrl } = req.body;   // 👈 imageUrl add kiya

    if (title) post.title = title.trim();
    if (content) post.content = content.trim();
    if (category) post.category = category.trim();
    if (excerpt) post.excerpt = excerpt.trim();
    if (tags) post.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean);
    if (imageUrl !== undefined) post.imageUrl = imageUrl?.trim() || null;   // 👈 YE ZAROORI HAI

    await post.save();
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    await post.destroy();
    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// GET ALL POSTS (public)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE POST (public, increments views)
export const getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.views += 1;
    await post.save();

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};