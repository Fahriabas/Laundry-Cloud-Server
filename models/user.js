'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Store, {
        foreignKey: "UserId"
      })
      User.hasMany(models.Transaction, {
        foreignKey: "UserId"
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Make the email field unique
        validate: {
          isEmail: true, // Validate email format
        },
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user, options) => {
    if (user.password) {
      user.password = hashPassword(user.password);
    }
  });

  return User;
};
