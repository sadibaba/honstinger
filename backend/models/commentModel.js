import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  postId: { type: DataTypes.INTEGER, allowNull: false },
  authorName: { type: DataTypes.STRING(100), defaultValue: 'Anonymous' },
  content: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'comments',
  timestamps: true,
});

export default Comment;