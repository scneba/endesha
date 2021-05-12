"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_answers",
      [
        {
          id: "09615861-1659-47db-89fa-b81732a6577a",
          answer: "Keep left except when overtaking",
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b495",
          question_id: "09915861-1659-47db-89fa-b81732a6577a",
        },
        {
          id: "08615861-1659-47db-89fa-b81732a6576a",
          answer: "First Aid point, Picnic site",
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b495",
          question_id: "08815861-1659-47db-89fa-b81732a6576a",
        },
        {
          id: "07615861-1659-47db-89fa-b81732a6575a",
          answer:
            "Give way, stop, parking, roundabout, exit from main road, one way traffic road, two way traffic road",
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b494",
          question_id: "07715861-1659-47db-89fa-b81732a6575a",
        },
        {
          id: "05615861-1659-47db-89fa-b81732a6578a",
          answer: "Adjust chair and mirrors",
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b494",
          question_id: "05515861-1659-47db-89fa-b81732a6574a",
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
    await queryInterface.bulkDelete("user_answers", null, {});
  },
};
