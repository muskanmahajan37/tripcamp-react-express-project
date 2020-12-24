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
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: false
    },
    mediaUrlIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
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
  Spot.associate = function (models) {
    // associations can be defined here
    Spot.hasMany(models.Review, { foreignKey: 'spotId' });
    Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    Spot.belongsToMany(models.User, { through: 'Ownership', otherKey: 'userId', foreignKey: 'spotId' });
    Spot.belongsToMany(models.Category, { through: 'CategorySpot', otherKey: 'categoryId', foreignKey: 'spotId' });
    Spot.belongsToMany(models.Amenity, { through: 'SpotAmenity', otherKey: 'amenityId', foreignKey: 'spotId' });
    Spot.belongsToMany(models.Attraction, { through: 'SpotAttraction', otherKey: 'attractionId', foreignKey: 'spotId' });
  };
  return Spot;
};