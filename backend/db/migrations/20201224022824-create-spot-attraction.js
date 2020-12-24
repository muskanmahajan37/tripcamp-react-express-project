'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SpotAttractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attractionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Attractions', key: 'id'}
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Spots', key: 'id'}
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SpotAttractions');
  }
};