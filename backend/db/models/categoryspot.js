'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategorySpot = sequelize.define('CategorySpot', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  CategorySpot.associate = function(models) {
    // associations can be defined here
  };
  return CategorySpot;
};