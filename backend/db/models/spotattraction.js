'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotAttraction = sequelize.define('SpotAttraction', {
    attractionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Attractions', key: 'id'}
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Spots', key: 'id'}
    }
  }, {});
  SpotAttraction.associate = function(models) {
    // associations can be defined here
  };
  return SpotAttraction;
};