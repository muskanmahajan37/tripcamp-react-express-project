// backend/routes/api/spots.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Medium } = require('../../db/models');

const router = express.Router();


router.get('/',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spots = await Spot.findAll();
    spots.forEach(spot => {
      const urls = spot.mediaUrlIds.map(async id => {
        const medium = await Medium.findByPk(id);
        // const url = medium.url;
        // if(!url.startsWith('http')) // TODO: do something to return the media hosted locally
        return medium.url;
      });
      spot.urls = urls;
    });
    console.log(spots);
    res.json(spots);
  })
);

router.get('/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id);
    const urls = [];
    for(let i = 0; i < spot.mediaUrlIds.length; i++){
      const medium = await Medium.findByPk(spot.mediaUrlIds[i]);
      urls.push(medium.url);
    }
    spot.dataValues.urls = urls;
    // console.log(spot.dataValues);
    res.json({ spot });
  })
);

module.exports = router;