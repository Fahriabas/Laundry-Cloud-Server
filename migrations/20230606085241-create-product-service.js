'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      TypeId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Types',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      },
      StoreId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Stores',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Menambahkan ON UPDATE CASCADE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductServices');
  }
};