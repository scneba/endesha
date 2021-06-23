"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "answers",
      [
        {
          id: "09615861-1659-47db-89fa-b81732a6577a",
          short_description: "Rule of road in Kenya",
          answer: "Keep left except when overtaking",
          answer_md: "Keep left except when overtaking",
        },
        {
          id: "08615861-1659-47db-89fa-b81732a6576a",
          short_description: "Road signs_first_aid_picnic",
          answer: "First Aid point, Picnic site",
          answer_md: "First Aid point, Picnic site",
        },
        {
          id: "07615861-1659-47db-89fa-b81732a6575a",
          short_description: "Signs of MTB",
          answer:
            "Give way, stop, parking, roundabout, exit from main road, one way traffic road, two way traffic road",
          answer_md:
            "Give way, stop, parking, roundabout, exit from main road, one way traffic road, two way traffic road",
        },
        {
          id: "05615861-1659-47db-89fa-b81732a6574a",
          short_description: "First thing to do when entering a car",
          answer: "Adjust chair and mirrors",
          answer_md: "Adjust chair and mirrors",
        },
      ],
      {},
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("answers", null, {});
  },
};
