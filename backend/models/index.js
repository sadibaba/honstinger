import sequelize from '../config/db.js';
import Post from './postModel.js';
import Comment from './commentModel.js';
import Category from './categoryModel.js';

// Relationships
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export { sequelize, Post, Comment, Category };