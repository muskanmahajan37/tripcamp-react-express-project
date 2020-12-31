// backend/routes/api/spots.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Medium, Review } = require('../../db/models');

const router = express.Router();


router.get('/',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spots = await Spot.findAll();
    for(let k = 0; k < spots.length; k++){
      const urls = [];
      for (let i = 0; i < spots[k].mediaUrlIds.length; i++) {
        const medium = await Medium.findByPk(spots[k].mediaUrlIds[i]);
        if(medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
        urls.push(medium.url);
      }      
      spots[k].dataValues.urls = urls;
    }
    res.json({ spots });
  })
);

router.get('/reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spots = await Spot.findAll({
      include: Review
    });
    for(let k = 0; k < spots.length; k++){
      const urls = [];
      for (let i = 0; i < spots[k].mediaUrlIds.length; i++) {
        const medium = await Medium.findByPk(spots[k].mediaUrlIds[i]);
        if(medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
        urls.push(medium.url);
      }      
      spots[k].dataValues.urls = urls;
    }
    res.json({ spots });
  })
);

router.get('/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id);
    const urls = [];
    for (let i = 0; i < spot.mediaUrlIds.length; i++) {
      const medium = await Medium.findByPk(spot.mediaUrlIds[i]);
      if(medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
      urls.push(medium.url);
    }
    spot.dataValues.urls = urls;
    res.json({ spot });
  })
);
router.get('/:id/Reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id, {
      include: Review
    });
    const urls = [];
    for (let i = 0; i < spot.mediaUrlIds.length; i++) {
      const medium = await Medium.findByPk(spot.mediaUrlIds[i]);
      if(medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
      urls.push(medium.url);
    }
    spot.dataValues.urls = urls;
    res.json({ spot });
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const spotDataObj = req.body.spot;
    console.log('spotDataObj', spotDataObj);
    if (req.user.id !== spotDataObj.userId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }
    delete spotDataObj.userId;
    // spotDataObj.status = 0;
    //TODO: implement backend spot validation before attempting to create a row in database
    try{
      const spot = await Spot.create(spotDataObj);
      res.json({ spot: spotDataObj });
    } catch (error) {
      return res.status(401).json({ error });
    }
  })
);

module.exports = router;