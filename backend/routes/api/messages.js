// backend/routes/api/messages.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require("sequelize");

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Message } = require('../../db/models');

const router = express.Router();

router.get('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const myId = req.user.id;
    if (!myId) {
      return res.status(401).json({ error: "Unauthorized user" }); //TODO: check this myId again the id sent by the user from frontend?
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
      console.log("Error in getting messages", req.user.id);
      return res.status(401).json({ error: "Error in geting messages" });
    }
  })
);

router.get('/:friendId',
  requireAuth,
  asyncHandler(async (req, res) => {
    const myId = req.user.id;
    const friendId = req.params.friendId;
    if (!myId) {
      return res.status(401).json({ error: "Unauthorized user" }); //TODO: check this myId again the id sent by the user from frontend?
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
      console.log("Error in getting messages", req.user.id);
      return res.status(401).json({ error: "Error in geting messages" });
    }
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const messageDataObj = req.body.message;
    console.log('messageDataObj', messageDataObj);
    if (req.user.id !== messageDataObj.senderId) {
      // console.log(req.user.id, messageDataObj.senderId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }
    //TODO: implement backend message validation before attempting to create a row in database
    try {
      const message = await Message.create(messageDataObj);
      res.json({ message });
    } catch (error) {
      return res.status(401).json({ error: "Error in posting the message" });
    }
  })
);
router.patch('/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const messageDataObj = req.body.message;
    // console.log('messageDataObj', messageDataObj);
    if (req.user.id !== messageDataObj.senderId) {
      // console.log(req.user.id, messageDataObj.senderId, "Unauthorized user");
      return res.status(401).json({ error: "Unauthorized user" });
    }
    //TODO: implement backend message validation before attempting to create a row in database
    try {
      const message = await Message.findByPk(Number(req.params.id));
      message.update({ status: 1 });
      res.json({ message });
    } catch (error) {
      return res.status(401).json({ error: "Error in posting the message" });
    }
  })
);

module.exports = router;