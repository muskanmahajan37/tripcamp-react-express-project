// backend/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { errorToSend } = require('../../utils/senderror');
const { User, UserProfile, Medium } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 30 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/:userId/userProfile',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = Number(req.params.userId);
    if (req.user.id !== userId) {
      return next(errorToSend(401, 'Profile Updating failed', ["Unauthorized user"]));
    }
    try{
      let userProfile = await UserProfile.findOne({
        where: {
          userId
        }
      })
      const urls = [];
      if(userProfile.mediaUrlIds){
        for(let i = 0; i < userProfile.mediaUrlIds.length; i++) {
          const medium = await Medium.findByPk(userProfile.mediaUrlIds[i]);
          urls.push(medium.url);
        }
      }
      userProfile.dataValues.urls = urls;
      res.json({ userProfile });
    } catch (error) {
      return next(errorToSend(401, 'Profile Updating failed', ["Coudn't find userProfile", error]));
    }
  })
);
router.post('/:userId/userProfile',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = Number(req.params.userId);
    const userProfileDataObj = req.body.userProfile;
    if (req.user.id !== userProfileDataObj.userId || req.user.id !== userId) {
      return next(errorToSend(401, 'Profile Updating failed', ["Unauthorized user"]));
    }
    if(!userProfileDataObj.type) userProfileDataObj.type = 3;
    //TODO: implement backend userProfile validation before attempting to create a row in database
    try{
      let userProfile = await UserProfile.findOne({
        where: {
          userId
        }
      })
      if(!userProfile) userProfile = await UserProfile.create(userProfileDataObj);
      else userProfile.update(userProfileDataObj);

      if(userProfile.dataValues.mediaUrlIds){
        const urls = [];
        for(let i = 0; i < userProfile.dataValues.mediaUrlIds.length; i++) {
          const medium = await Medium.findByPk(userProfile.dataValues.mediaUrlIds[i]);
          urls.push(medium.url);
        }
        userProfile.dataValues.urls = urls;
      }
      res.json({ userProfile });
    } catch (error) {   
      return next(errorToSend(401, 'Profile Updating failed', ["Error updating profile", error]));
    }
  })
);

module.exports = router;