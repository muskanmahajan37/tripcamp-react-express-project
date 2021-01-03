// backend/routes/api/bookings.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, Ownership } = require('../../db/models');

const router = express.Router();

router.get('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await User.findByPk(userId, {
        include: { model: Spot, through: Ownership }
      });
      const spotIds = user.Spots.map(spot => spot.id);

      const myTripBookings = await Booking.findAll({
        where: {
          userId,
        }
      });
      const bookingsOfMyProps = await Booking.findAll({
        where: {
          spotId: spotIds
        }
      });
      res.json({ bookings: [...myTripBookings, ...bookingsOfMyProps] });
    } catch (e) {
      res.status(401).json({ error: "no bookings found" });
    }
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const bookingDataObj = req.body.booking;
    if (req.user.id !== bookingDataObj.userId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    bookingDataObj.status = 0;
    //TODO: implement backend booking validation before attempting to create a row in database
    try {
      const booking = await Booking.create(bookingDataObj);
      res.json({ booking });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

router.patch('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const bookingDataObj = req.body.booking;
    if (req.user.id !== bookingDataObj.myUserId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    //TODO: implement backend booking validation before attempting to create a row in database
    try {
      // const booking = await Booking.update(bookingDataObj);
      const bookingInDatabase = await Booking.findByPk(bookingDataObj.id);
      bookingInDatabase.status = bookingDataObj.status;
      await bookingInDatabase.save();
      res.json({ booking: bookingInDatabase });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

router.delete('/:bookingId',
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log('bookingid', req.params.bookingId);
    const bookingInDatabase = await Booking.findByPk(req.params.bookingId);
    console.log('booking to destroy', bookingInDatabase);
    if (!bookingInDatabase || req.user.id !== bookingInDatabase.userId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    //TODO: implement backend booking validation before attempting to create a row in database
    try {
      await bookingInDatabase.destroy();
      res.json({ bookingId: req.params.bookingId });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);


module.exports = router;