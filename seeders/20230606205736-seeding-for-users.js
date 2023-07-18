'use strict';

const fs = require('fs');
const { hashPassword } = require('../helpers/bcrypt');
const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8')).map(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
  el.password = hashPassword(el.password)
  return el
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  }
};
