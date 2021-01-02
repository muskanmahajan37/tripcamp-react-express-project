'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ownership = sequelize.define('Ownership', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id'}
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Spots', key: 'id'}
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
  }, {});
  Ownership.associate = function(models) {
    // associations can be defined here
  };
  return Ownership;
};