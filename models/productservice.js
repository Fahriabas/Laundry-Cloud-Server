'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductService.belongsTo(models.Store, {
        foreignKey: "StoreId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
      ProductService.hasMany(models.Transaction, {
        foreignKey: "ProductServiceId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
      ProductService.belongsTo(models.Type, {
        foreignKey: "TypeId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
    }
  }
  ProductService.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    TypeId: DataTypes.INTEGER,
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductService',
  });
  return ProductService;
};