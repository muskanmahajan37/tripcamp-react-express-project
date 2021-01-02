// backend/routes/api/reviews.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (reg, res) => {
  res.json("All reviews - to be implemented");
}));

router.post('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const reviewDataObj = req.body.review;
    console.log('reviewDataObj', reviewDataObj);
    if (req.user.id !== reviewDataObj.userId) {
      console.log(req.user.id, reviewDataObj.userId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }
    reviewDataObj.type = 0;
    //TODO: implement backend review validation before attempting to create a row in database
    try{
      const review = await Review.create(reviewDataObj);
      res.json({ review });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

module.exports = router;