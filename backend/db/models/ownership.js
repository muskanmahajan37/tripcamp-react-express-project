'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ownership = sequelize.define('Ownership', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {});
  Ownership.associate = function(models) {
    // associations can be defined here
  };
  return Ownership;
};