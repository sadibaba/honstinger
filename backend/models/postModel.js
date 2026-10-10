import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Post = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT('long'), allowNull: false },
  excerpt: { type: DataTypes.STRING(500), defaultValue: '' },
  category: { type: DataTypes.STRING(100), allowNull: false },
  tags: { type: DataTypes.JSON, defaultValue: [] },
  imageUrl: { type: DataTypes.STRING(500), defaultValue: null },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  slug: { type: DataTypes.STRING(250), unique: true, allowNull: true },
}, {
  tableName: 'posts',
  timestamps: true,
});

export default Post;