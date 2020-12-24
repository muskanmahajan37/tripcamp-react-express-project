'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Amenity.associate = function (models) {
    // associations can be defined here
    Amenity.belongsToMany(models.Spot, { through: 'SpotAmenity', otherKey: 'spotId', foreignKey: 'amenityId' });
  };
  return Amenity;
};