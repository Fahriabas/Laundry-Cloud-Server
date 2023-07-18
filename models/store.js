'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
      Store.hasMany(models.ProductService, {
        foreignKey: "StoreId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      })
    }
  }
  Store.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};