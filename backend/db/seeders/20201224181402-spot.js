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
    return queryInterface.bulkInsert("Spots", [
      {
        name: "Madrone Tree Hill",
        description: "Madrone Tree Hill is a great place to camp, offering great privacy as it is tucked away in the trees.\
                      The view of the night sky from the open field is spectacular and you can catch the Milky Way.\
                      Madrone Tree Hill has been family-owned and -operated since the 1960’s providing lush, tall,\
                      green trees to spruce up your home during the holiday season. While the holidays last for a specific time, \
                      our property is open year round for guests to enjoy the natural beauty of Tree Hill. With local breweries, \
                      wineries, and apple farms in close vicinity, there’s always something to do. And with the views we have, \
                      it makes the perfect venue for your wedding and upcoming events. Disconnect from the world and experience the rich, \
                      natural beauty of Madrone Tree Hill",
        units: 4,
        gpsLocation: [38.7495019798234, -120.68306268095546],
        mediaUrlIds: [1, 2, 3],
        streetAddress: "2600 Barkley Rd",
        city: 'Camino',
        stateProvince: 'CA',
        zipCode: 95709,
        country: "USA",
        perNightRate: 50.00,
        website: 'https://madronetreehill.com/'
      }, 
      {
        name: "The Heron Campground",
        description: "The Heron is a mindful community, raising conscious vibrations through art, music, farming, education and events while enriching lives and the land.\
                      The Heron grounds boast a swimming and fishing pond and over 4 miles of on-site hiking trails. Located on over 400 acres in beautiful\
                      Chautauqua County, NY, we are a working organic farm with a shiitake mushroom yard and on-site farm store.\
                      We host educational workshops, captivating music festivals, and much more!",
        units: 2,
        gpsLocation: [42.10445476325384, -79.55525254232849],
        mediaUrlIds: [4, 5, 6, 7],
        streetAddress: "2361 Wait Corners Rd",
        city: 'Sherman',
        stateProvince: 'NY',
        zipCode: 14781,
        country: "USA",
        perNightRate: 40.00,
        website: 'http://theheron.org/'
      }, 
      {
        name: "Ta Xua Nature Reserve",
        description: "A hidden gem off the beaten track, Ta Xua is the 10th highest mountain in Vietnam and famous for its legendary “dinosaur backbone” \
                      trail and a magical floating sea of clouds. Visiting Ta Xua Nature Reserve in the best time of the year – October and November, \
                      you have a chance to witness rice terraces turning ripe in bright yellow, the wildflowers blooming everywhere and enjoy the perfect weather, \
                      not too hot nor not too cold. Ta Xua will become your memorable camping site where you can see untouched natural sceneries and amazing trails, \
                      as well as enjoying the sunshine underneath a clear blue sky. You can find the best camping spot in Ta Xua Nature Reserve on the peak of \
                      the mountain by trekking up to the 2.200 meters base camp",
        units: 5,
        gpsLocation: [21.309035101078653, 104.46487376026307],
        mediaUrlIds: [8, 9, 10, 11],
        streetAddress: "about 220 km from Hanoi",
        city: 'Bac Yen',
        stateProvince: 'Son La',
        zipCode: 10000,
        country: "Vietnam",
        perNightRate: 10.00,
        website: 'https://nemtv.vn/'
      }, 
      {
        name: "Bull Run Campground",
        description: "Hike along various trails, take on a few rounds of disc golf or just find a new spot for a family picnic! In the summertime, \
                      visitors can also enjoy their day at Atlantis Waterpark! All these great features are within walking distance of the Bull Run \
                      campground! The variety of campsites available at Bull Run Campground are RV sites with electric only service, RV sites with \
                      full-service (which includes sewer, water and electric), rustic cabins and group camping areas. All campsites have a charcoal grill, \
                      fire ring and picnic table. There are two bathhouses in the campground that offer hot showers, sinks, toilets and laundry facilities. \
                      The camp store sells camping supplies, snacks, ice and firewood and is open daily from 8:00 a.m. to 8:00 p.",
        units: 15,
        gpsLocation: [38.81066111,-77.49129471],
        mediaUrlIds: [12],
        streetAddress: "7700 Bull Run Dr",
        city: 'Centreville',
        stateProvince: 'VA',
        zipCode: 2012,
        country: "USA",
        perNightRate: 10.00,
        website: 'https://www.novaparks.com/cabins-camping/camping'
      }, 
      {
        name: "The Atrium at Meadowlark",
        description: "The Atrium at Meadowlark features exposed brick walls, a glass-enclosed cathedral ceiling, and a large terrace overlooking the botanical \
                      gardens. This remarkable space will seat up to 230 guests, with standing room for 300. Take advantage of the gazebos, Bell Garden, and \
                      Lilac Pavilion for photography and other event options at Meadowlark Botanical Gardens. Great Blue Heron provides full on-site catering for \
                      any event at The Atrium. \
                      Settled within Meadowlark Botanical Gardens are three gazebos that serve as perfect locations for a private and intimate wedding ceremony. \
                      Each wedding gazebo accommodates varying capacities and are located throughout the garden. Maximum capacities range between 50 to 120 \
                      standing guests in and around the gazebos. The Lake Caroline Gazebo is the most commonly used gazebo for wedding ceremonies as it is located \
                      at the end of a dock in the middle of Lake Caroline. With a 360 degree view of the gardens, this gazebo is perfect for an outdoor ceremony.",
        units: 15,
        gpsLocation: [38.93823645,-77.28193882],
        mediaUrlIds: [13],
        streetAddress: "9750 Meadowlark Gardens Ct	",
        city: 'Vienna',
        stateProvince: 'VA',
        zipCode: 22182,
        country: "USA",
        perNightRate: 200.00,
        website: 'https://www.novaparks.com/weddings-catering/the-atrium-at-meadowlark'
      }, 
      {
        name: "Shenandoah National Park",
        description: "Fall colors are great. Fall temperatures? Not always so much. That's why if you prefer the climate-controlled comfort of your SUV there's \
                      no better place in America for leaves than Shenandoah National Park. It's home to the famous 105-mile Skyline Drive, where you'll be enshrouded \
                      by a canopy of red, orange, yellow, and green. Aim the park’s eastern border and you’ll find another famous drive: Blue Ridge Parkway, \
                      which climbs thousands of feet in elevation from its start in central Virginia to its end in Cherokee National Forest. Typically, higher \
                      elevations will turn first -- toward mid-September -- and the lower elevations will transition as the season wears on.",
        units: 155,
        gpsLocation: [38.55066256688068,-78.4648730208818],
        mediaUrlIds: [14],
        streetAddress: "Shenandoah Valley",
        city: 'Linville',
        stateProvince: 'VA',
        zipCode: 22802,
        country: "USA",
        perNightRate: 10.00,
        website: 'https://www.nps.gov/shen/index.htm'
      }, 
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
