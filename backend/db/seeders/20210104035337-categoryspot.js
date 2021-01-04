'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('CategorySpots', [
      {spotId: 10, categoryId: 1},
      {spotId: 7, categoryId: 1},
      {spotId: 1, categoryId: 2},
      {spotId: 4, categoryId: 2},
      {spotId: 2, categoryId: 3},
      {spotId: 10, categoryId: 3},
      {spotId: 2, categoryId: 3},
      {spotId: 10, categoryId: 4},
      {spotId: 7, categoryId: 4},
      {spotId: 6, categoryId: 4},
      {spotId: 3, categoryId: 4},
      {spotId: 5, categoryId: 5},
      {spotId: 6, categoryId: 5},
      {spotId: 5, categoryId: 7},
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('CategorySpots', null, {});
  }
};
