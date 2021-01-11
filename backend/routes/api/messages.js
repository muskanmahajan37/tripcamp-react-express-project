// backend/routes/api/messages.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require("sequelize");

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { errorToSend } = require('../../utils/senderror');
const { User, Message } = require('../../db/models');

const router = express.Router();

router.get('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    if (!myId) {
      return next(errorToSend(401, 'Getting messages failed', ["Unauthorized user"]));
      //TODO: check this myId again the id sent by the user from frontend?
    }
    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: myId },
            { recipientId: myId }
          ],
        },
        order: [['createdAt', 'ASC']]
      })
      res.json({ messages });
    } catch (e) {
      return next(errorToSend(401, 'Getting messages failed', ["Error in posting the message"]));
    }
  })
);

router.get('/friends/:friendId',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const myId = req.user.id;
    const friendId = req.params.friendId;
    if (!myId) {
      return next(errorToSend(401, 'Getting messages failed', ["Unauthorized user"]));
      //TODO: check this myId again the id sent by the user from frontend?
    }
    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: myId, recipientId: friendId},
            { senderId: friendId, recipientId: myId }
          ],
        },
        order: [['createdAt', 'ASC']]
      })
      res.json({ messages });
    } catch (e) {
      return next(errorToSend(401, 'Getting messages failed', ["Error in posting the message"]));
    }
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const messageDataObj = req.body.message;
    console.log('messageDataObj', messageDataObj);
    if (req.user.id !== messageDataObj.senderId) {
      // console.log(req.user.id, messageDataObj.senderId, "Unauthorized user");
      return next(errorToSend(401, 'Getting messages failed', ["Unauthorized user"]));
    }
    //TODO: implement backend message validation before attempting to create a row in database
    try {
      const message = await Message.create(messageDataObj);
      res.json({ message });
    } catch (error) {
      return next(errorToSend(401, 'Getting messages failed', ["Error in posting the message"]));
    }
  })
);
router.patch('/:id',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const messageDataObj = req.body.message;
    // console.log('messageDataObj', messageDataObj);
    if (req.user.id !== messageDataObj.senderId) {
      return next(errorToSend(401, 'Getting messages failed', ["Unauthorized user"]));
    }
    //TODO: implement backend message validation before attempting to create a row in database
    try {
      const message = await Message.findByPk(Number(req.params.id));
      message.update({ status: 1 });
      res.json({ message });
    } catch (error) {
      return next(errorToSend(401, 'Getting messages failed', ["Error in posting the message"]));
    }
  })
);

module.exports = router;