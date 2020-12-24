'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: 'id' }
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Spots", key: 'id' }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Review;
};