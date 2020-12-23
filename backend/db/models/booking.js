'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    guests: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    specialRequest: DataTypes.TEXT
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};