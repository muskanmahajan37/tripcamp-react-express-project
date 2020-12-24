'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attraction = sequelize.define('Attraction', {
    name: {
      type: DataTypes.STRING(100),
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
      allowNull: true
    },
    activities: {
      type: DataTypes.ARRAY(DataTypes.STRING(100)),
      allowNull: true
    }
  }, {});
  Attraction.associate = function(models) {
    // associations can be defined here
    Attraction.belongsToMany(models.Spot, { through: 'SpotAttraction', otherKey: 'spotId', foreignKey: 'attractionId' });
  };
  return Attraction;
};