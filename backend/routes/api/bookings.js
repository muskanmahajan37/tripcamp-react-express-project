// backend/routes/api/bookings.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Spots } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (reg, res) => {
  res.json("All bookings - to be implemented");
}));

router.post('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const bookingDataObj = req.body.booking;
    if (req.user.id !== bookingDataObj.userId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    bookingDataObj.status = 0;
    try{
      const booking = await Booking.create(bookingDataObj);
      res.json({ booking: bookingDataObj });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

module.exports = router;