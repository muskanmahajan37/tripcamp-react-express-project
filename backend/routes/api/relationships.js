// backend/routes/api/relationships.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Relationship } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (reg, res) => {
  res.json("All relationships - to be implemented");
}));

router.post('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const relationshipDataObj = req.body.relationship;
    console.log('relationshipDataObj', relationshipDataObj);
    if (req.user.id !== relationshipDataObj.myUserId) {
      console.log(req.user.id, relationshipDataObj.myUserId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }

    let email, username;
    if (relationshipDataObj.credential.includes('@')) email = relationshipDataObj.credential;
    else username = relationshipDataObj.credential;
    let user;
    if (email) {
      user = await User.findOne({
        where: {
          email
        }
      });
    } else {
      user = await User.findOne({
        where: {
          username
        }
      });
    }

    if(!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (relationshipDataObj.myUserId < user.id) {
      relationshipDataObj.user1Id = relationshipDataObj.myUserId;
      relationshipDataObj.user2Id = user.id;
    } else {
      relationshipDataObj.user2Id = relationshipDataObj.myUserId;
      relationshipDataObj.user1Id = user.id;
    }
    relationshipDataObj.lastActionUserId = relationshipDataObj.myUserId;
    relationshipDataObj.status = 0;
    relationshipDataObj.followingship = 0;
    delete relationshipDataObj.myUserId, relationshipDataObj.credential;
    //TODO: to send the 'user' found the relationshipDataObj.message
    //TODO: implement backend relationship validation before attempting to create a row in database
    try {
      const relationship = await Relationship.create(relationshipDataObj);
      res.json({ relationship });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

module.exports = router;