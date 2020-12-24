'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specialRequest: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {});
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Booking;
};