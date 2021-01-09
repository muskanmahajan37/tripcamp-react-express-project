// backend/routes/api/spots.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Medium, Review, Ownership, User, Category, CategorySpot } = require('../../db/models');

const router = express.Router();


router.get('/',
  asyncHandler(async (req, res) => {
    // const userId = req.user.id;
    const spots = await Spot.findAll({
      include: [{ model: User, through: Ownership }, { model: Category, through: CategorySpot }],
      order: [['id', 'ASC']]
    });
    for (let k = 0; k < spots.length; k++) {
      // if(userId){
      //   const ownership = await Ownership.findOne({
      //     where: {
      //       spotId: spots[k].id
      //     }
      //   });
      //   if(ownership.userId === userId){
      //     console.log("\n\n\n\nownership.userId", userId);
      //     spots[k].dataValues.mySpot = true;
      //   }
      // }
      if (!spots[k].mediaUrlIds) continue;
      const urls = [];
      for (let i = 0; i < spots[k].mediaUrlIds.length; i++) {
        if (!spots[k].mediaUrlIds[i]) continue;
        const medium = await Medium.findByPk(spots[k].mediaUrlIds[i]);
        if (medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
        urls.push(medium.url);
      }
      spots[k].dataValues.urls = urls;
      console.log(spots[k].dataValues);
    }
    res.json({ spots });
  })
);

router.get('/reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spots = await Spot.findAll({
      include: [
        { model: Review, include: {model: User} },
        { model: User, through: Ownership },
        { model: Category, through: CategorySpot }
      ],
      order: [['id', 'ASC']]
    });
    for (let k = 0; k < spots.length; k++) {
      if (!spots[k].mediaUrlIds) continue;
      const urls = [];
      for (let i = 0; i < spots[k].mediaUrlIds.length; i++) {
        if (!spots[k].mediaUrlIds[i]) continue;
        const medium = await Medium.findByPk(spots[k].mediaUrlIds[i]);
        if (medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
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
      if (!spots.mediaUrlIds[i]) continue;
      const medium = await Medium.findByPk(spot.mediaUrlIds[i]);
      if (medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
      urls.push(medium.url);
    }
    spot.dataValues.urls = urls;
    res.json({ spot });
  })
);
router.get('/:id/reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id, {
      include: [
        { model: Review, include: {model: User} },
        { model: User, through: Ownership },
        { model: Category, through: CategorySpot }
      ],
    });
    const urls = [];
    for (let i = 0; i < spot.mediaUrlIds.length; i++) {
      if (!spots.mediaUrlIds[i]) continue;
      const medium = await Medium.findByPk(spot.mediaUrlIds[i]);
      if (medium.url.startsWith('/resources')) medium.url = 'https://tripcamp.s3.amazonaws.com' + medium.url;
      urls.push(medium.url);
    }
    spot.dataValues.urls = urls;
    res.json({ spot });
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const spotDataObj = req.body.spot;
    if (req.user.id !== spotDataObj.userId) {
      const err = new Error('Ownership creating failed');
      err.status = 401;
      err.title = 'Ownership creating failed';
      err.errors = ["Unauthorized user"];
      return next(err);         
    }
    delete spotDataObj.userId;
    // spotDataObj.status = 0;
    //TODO: implement backend spot validation before attempting to create a row in database
    try {
      const spot = await Spot.create(spotDataObj);
      let err;
      let ownership;
      try {
        ownership = await Ownership.create({ userId: req.user.id, spotId: spot.id });
      } catch (e) {
        const err = new Error('Ownership creating failed');
        err.status = 401;
        err.title = 'Ownership creating failed';
        err.errors = ["Could not create ownership"];
        return next(err);          
      }
      let returnJson = { spot };
      if (ownership) returnJson.ownership = ownership;
      if (err) returnJson.error = err;
      res.json(returnJson);
    } catch (error) {
      const err = new Error('Ownership creating failed');
      err.status = 401;
      err.title = 'Ownership creating failed';
      err.errors = ["Could not create ownership", error];
      return next(err);       
    }
  })
);

module.exports = router;