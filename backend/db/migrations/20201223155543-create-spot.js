'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      units: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      gpsLocation: {
        type: Sequelize.ARRAY(Sequelize.DOUBLE),
        allowNull: false
      },
      mediaUrlIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      streetAddress: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      stateProvince: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      zipCode: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      perNightRate: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      accommodationType: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      website: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};