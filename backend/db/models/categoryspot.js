'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategorySpot = sequelize.define('CategorySpot', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Spots', key: 'id'}
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Categories', key: 'id'}
    },
  }, {});
  CategorySpot.associate = function(models) {
    // associations can be defined here
  };
  return CategorySpot;
};