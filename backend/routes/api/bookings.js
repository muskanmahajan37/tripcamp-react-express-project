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
  // requireAuth,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    res.json({ booking: {} });
  })
);

module.exports = router;