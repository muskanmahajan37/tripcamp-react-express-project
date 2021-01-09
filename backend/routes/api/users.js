// backend/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, UserProfile } = require('../../db/models');

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

router.post('/:userId/userProfile',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userProfileDataObj = req.body.userProfile;
    // console.log('userProfileDataObj', userProfileDataObj);
    if (req.user.id !== userProfileDataObj.userId || req.user.id !== userId) {
      console.log(req.user.id, userProfileDataObj.userId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }
    userProfileDataObj.type = 3;
    //TODO: implement backend userProfile validation before attempting to create a row in database
    try{
      const userProfile = await UserProfile.create(userProfileDataObj);
      res.json({ userProfile });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

module.exports = router;