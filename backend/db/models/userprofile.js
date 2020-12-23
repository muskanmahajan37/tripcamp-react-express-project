'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mediaUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: true
    },
    streetAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stateProvince: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gpsLocation: {
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // array of spotId's of favorited spots
      allowNull: true
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // array of userId's of the followers
      allowNull: true
    },
    followings: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // array of userId's of the followings
      allowNull: true
    },
    cashEarned: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cashSpent: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    badge: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
  }, {});
  UserProfile.associate = function(models) {
    // associations can be defined here
  };
  return UserProfile;
};