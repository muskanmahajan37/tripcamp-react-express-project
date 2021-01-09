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
  asyncHandler(async (req, res, next) => {
    const reviewDataObj = req.body.review;
    console.log('reviewDataObj', reviewDataObj);
    if (req.user.id !== reviewDataObj.userId) {
      const err = new Error('Review creating failed');
      err.status = 401;
      err.title = 'Review creating failed';
      err.errors = ["Unauthorized user"];
      return next(err);       
    }
    reviewDataObj.type = 0;
    //TODO: implement backend review validation before attempting to create a row in database
    try{
      const review = await Review.create(reviewDataObj);
      res.json({ review });
    } catch (error) {
      const err = new Error('Review creating failed');
      err.status = 401;
      err.title = 'Review creating failed';
      err.errors = ["Could not create review", error];
      return next(err);        
    }
  })
);

module.exports = router;