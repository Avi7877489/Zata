// models/File.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';
import User from './user.js';

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  s3Key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
});

User.hasMany(File);
File.belongsTo(User);

export default File;