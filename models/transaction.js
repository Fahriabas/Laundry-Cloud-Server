'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
      Transaction.belongsTo(models.ProductService, {
        foreignKey: "ProductServiceId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductServiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};