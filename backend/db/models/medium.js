'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medium = sequelize.define('Medium', {
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {});
  Medium.associate = function(models) {
    // associations can be defined here
    //TODO: how to add associations in case of ARRAY type?
  };
  return Medium;
};