'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
  }, {});
  Category.associate = function (models) {
    // associations can be defined here
    Category.belongsToMany(models.Spot, { through: 'CategorySpot', otherKey: 'spotId', foreignKey: 'categoryId' });
  };
  return Category;
};