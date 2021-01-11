// backend/routes/api/bookings.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { errorToSend } = require('../../utils/senderror');
const { User, Booking, Spot, Ownership } = require('../../db/models');

const router = express.Router();

router.get('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    try {
      const user = await User.findByPk(userId, {
        include: { model: Spot, through: Ownership }
      });
      const spotIds = user.Spots.map(spot => spot.id);

      const myTripBookings = await Booking.findAll({
        where: {
          userId,
        },
        order: [['id', 'ASC']]
      });
      const bookingsOfMyProps = await Booking.findAll({
        where: {
          spotId: spotIds
        },
        order: [['id', 'ASC']],
        include: User
      });
      res.json({ bookings: [...myTripBookings, ...bookingsOfMyProps] });
    } catch (e) {
      return next(errorToSend(401, 'Booking failed', ["no bookings found"]));
    }
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const bookingDataObj = req.body.booking;
    if (req.user.id !== bookingDataObj.userId) {
      return next(errorToSend(401, 'Booking failed', ["Unauthorized user"]));
    }
    bookingDataObj.status = 0;
    //TODO: implement backend booking validation before attempting to create a row in database
    try {
      const booking = await Booking.create(bookingDataObj);
      res.json({ booking });
    } catch (error) {
      return next(errorToSend(401, 'Booking failed', [error]));
    }
  })
);

router.patch('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const bookingDataObj = req.body.booking;
    if (req.user.id !== bookingDataObj.myUserId) {
      return next(errorToSend(401, 'Booking failed', ["Unauthorized user"]));
    }
    //TODO: implement backend booking validation before attempting to create a row in database
    try {
      // const booking = await Booking.update(bookingDataObj);
      let bookingInDatabase = await Booking.findByPk(bookingDataObj.id);
      bookingInDatabase.status = bookingDataObj.status;
      await bookingInDatabase.save();
      bookingInDatabase = await Booking.findByPk(bookingDataObj.id, {
        include: User
      });
      res.json({ booking: bookingInDatabase });
    } catch (error) {
      return next(errorToSend(401, 'Booking failed', [error]));
    }
  })
);

router.delete('/:bookingId',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const bookingInDatabase = await Booking.findByPk(req.params.bookingId);
    if (!bookingInDatabase || req.user.id !== bookingInDatabase.userId) {
      return next(errorToSend(401, 'Booking failed', ["Unauthorized user"]));
    }
    //TODO: implement backend booking validation before attempting to create a row in database
    try {
      await bookingInDatabase.destroy();
      res.json({ bookingId: req.params.bookingId });
    } catch (error) {
      return next(errorToSend(401, 'Booking failed', [error]));
    }
  })
);


module.exports = router;