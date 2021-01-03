// backend/routes/api/relationships.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require("sequelize");

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Relationship, UserProfile } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json("All relationships - to be implemented");
}));


router.patch('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log(req.body.relationship);
    const myUserId = Number(req.body.relationship.myUserId);
    if (req.user.id !== myUserId) {
      console.log(req.user.id, myUserId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }
    try {
      const relationshipId = Number(req.body.relationship.id);
      const status = Number(req.body.relationship.status)
      const relationship = await Relationship.findByPk(relationshipId);
      await relationship.update({ status });
      res.json(relationship);
    } catch (e) {
      res.status(401).json({ error: "Some error finding the relationships" });
    }
  })
);

router.get('/users/:userId',
  requireAuth,
  asyncHandler(async (req, res) => {
    const myUserId = Number(req.params.userId);
    if (req.user.id !== myUserId) {
      console.log(req.user.id, myUserId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }
    try {
      const myRequests = await Relationship.findAll({
        where: {
          lastActionUserId: myUserId,
          status: 0
        },
        include: [
          {
            model: User,
            as: 'user1',
            include: UserProfile
          },
          {
            model: User,
            as: 'user2',
            include: UserProfile
          }
        ]
      });

      const theirRequests = await Relationship.findAll({
        where: {
          lastActionUserId: {
            [Op.ne]: myUserId,
          },
          [Op.or]: [
            { user1Id: myUserId },
            { user2Id: myUserId }
          ],
          status: 0
        },
        include: [
          {
            model: User,
            as: 'user1',
            include: UserProfile
          },
          {
            model: User,
            as: 'user2',
            include: UserProfile
          }
        ]
      });

      const myFriends = await Relationship.findAll({
        where: {
          [Op.or]: [
            { user1Id: myUserId },
            { user2Id: myUserId }
          ],
          status: 1
        },
        include: [
          {
            model: User,
            as: 'user1',
            include: UserProfile
          },
          {
            model: User,
            as: 'user2',
            include: UserProfile
          }
        ]
      });

      const myFollowers = await Relationship.findAll({
        where: {
          [Op.or]: [
            { followingship: 1 },
            {
              [Op.or]: [{
                user1Id: myUserId,
                followingship: 21
              }, {
                user2Id: myUserId,
                followingship: 12
              }]
            }
          ]
        },
        include: [
          {
            model: User,
            as: 'user1',
            include: UserProfile
          },
          {
            model: User,
            as: 'user2',
            include: UserProfile
          }
        ]
      });
      const myFollowings = await Relationship.findAll({
        where: {
          [Op.or]: [
            { followingship: 1 },
            {
              [Op.or]: [{
                user1Id: myUserId,
                followingship: 12
              }, {
                user2Id: myUserId,
                followingship: 21
              }]
            }
          ]
        },
        include: [
          {
            model: User,
            as: 'user1',
            include: UserProfile
          },
          {
            model: User,
            as: 'user2',
            include: UserProfile
          }
        ]
      });
      const relationships = [...myRequests, ...theirRequests, ...myFriends, ...myFollowers, ...myFollowings];
      res.json({ relationships, myRequests, theirRequests, myFriends, myFollowers, myFollowings });
    } catch (e) {
      res.status(401).json({ error: "Some error finding the relationships" });
    }
  })
);

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

    if (!user) {
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
      let relationship = await Relationship.findOne({
        where: {
          user1Id: relationshipDataObj.user1Id,
          user2Id: relationshipDataObj.user2Id,
        }
      });
      if (relationship) {
        if(relationship.status === 4 || relationship.status === 2) //cancelled by the requester
          relationship.update({ status: 0 })
        else if(relationship.status === 3) //I'm being blocked
          return res.status(401).json({ error: "Cannot add this user as friend" });
        else if(relationship.status === 1)
        return res.status(401).json({ error: "You are already friends" });
      }
      else relationship = await Relationship.create(relationshipDataObj);
      res.json({ relationship });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

module.exports = router;