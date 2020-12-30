'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Media', [
      {
        url: '/resources/images/spots/madrone-tree-hill-northern-california-forest-stars-milky-way.jpg',
        name: 'madrone-tree-hill-northern-california-forest-stars-milky-way.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: '/resources/images/spots/madrone-tree-hill-madrone-tree-hill-northern-california.jpg',
        name: 'madrone-tree-hill-madrone-tree-hill-northern-california.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: '/resources/images/spots/madrone-tree-hill-madrone-tree-hill-northern-california_tent1.jpg',
        name: 'madrone-tree-hill-madrone-tree-hill-northern-california_tent1.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: '/resources/images/spots/the-heron-campground-the-heron-campground-presque-isle.jpg',
        name: 'the-heron-campground-the-heron-campground-presque-isle.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: '/resources/images/spots/the-heron-campground-the-heron-campground-presque-isle1.jpg',
        name: 'the-heron-campground-the-heron-campground-presque-isle1.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: '/resources/images/spots/the-heron-campground-the-heron-campground-presque-isle2.jpg',
        name: 'the-heron-campground-the-heron-campground-presque-isle2.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: '/resources/images/spots/the-heron-campground-the-heron-campground-presque-isle3.jpg',
        name: 'the-heron-campground-the-heron-campground-presque-isle3.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: 'https://vietnamdiscovery.com/wp-content/uploads/2019/10/Mountain-in-the-clouds-in-Ta-Xua-@hataos_.jpg',
        name: 'Mountain-in-the-clouds-in-Ta-Xua-@hataos_.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: 'https://www.vietnambooking.com/wp-content/uploads/2020/07/ta-xua-san-may-7.jpg',
        name: 'ta-xua-san-may-7.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: 'https://youtu.be/jMt0eKnMoI0',
        name: 'San Bien May Ta Xua Son La Bang Flycam - Nem TV',
        type: 'video/YouTube',
        source: 0
      },
      {
        url: 'https://www.vietnambooking.com/wp-content/uploads/2020/07/ta-xua-san-may-9.jpg',
        name: 'ta-xua-san-may-9.jpg',
        type: 'image/jpg',
        source: 0
      },
      {
        url: 'https://tripcamp.s3.amazonaws.com/resources/images/official/spots/BullRun6.jpg',
        name: 'BullRun6.jpg',
        type: 'image/jpeg',
        source: 0
      },
      {
        url: 'https://tripcamp.s3.amazonaws.com/resources/images/official/spots/Atrium8.jpg',
        name: 'Atrium8.jpg',
        type: 'image/jpeg',
        source: 0
      },
      {
        url: 'https://tripcamp.s3.amazonaws.com/resources/images/official/spots/shennadoahvalley2.jpg',
        name: 'shennadoahvalley2.jpg',
        type: 'image/jpeg',
        source: 0
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Media', null, {});
  }
};
