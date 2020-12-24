'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id'}
      },
      mediaUrlIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        // references: { model: 'Media', key: 'id'}
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
      country: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      gpsLocation: {
        type: Sequelize.ARRAY(Sequelize.DOUBLE),
        allowNull: true
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      favorites: {
        type: Sequelize.ARRAY(Sequelize.INTEGER), // array of spotId's of favorited spots
        allowNull: true
      },
      rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      followers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER), // array of userId's of the followers
        allowNull: true
      },
      followings: {
        type: Sequelize.ARRAY(Sequelize.INTEGER), // array of userId's of the followings
        allowNull: true
      },
      cashEarned: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      cashSpent: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      badge: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable('UserProfiles');
  }
};