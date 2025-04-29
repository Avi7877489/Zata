// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true // Can be null for OAuth users
  },
  provider: {
    type: DataTypes.STRING, // 'local', 'google', 'github'
    allowNull: false,
    defaultValue: 'local'
  },
  providerId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default User;