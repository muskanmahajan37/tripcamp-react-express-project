'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gpsLocation: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    },
    defaultPictureUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    altitude: {
      type: DataTypes.FLOAT,
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
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
  };
  return Spot;
};