"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "questions",
      [
        {
          id: "09915861-1659-47db-89fa-b81732a6577a",
          question: "what is the rule of road in kenya?",
          category_id: "06615861-1659-47db-89fa-b81732a6577a",
          answer_id: "09615861-1659-47db-89fa-b81732a6577a",
        },
        {
          id: "08815861-1659-47db-89fa-b81732a6576a",
          question: "Names of the signs below",
          category_id: "06615861-1659-47db-89fa-b81732a6576a",
          answer_id: "08615861-1659-47db-89fa-b81732a6576a",
        },
        {
          id: "07715861-1659-47db-89fa-b81732a6575a",
          question: "What are 7 signs on the model town board",
          category_id: "06615861-1659-47db-89fa-b81732a6575a",
          answer_id: "07615861-1659-47db-89fa-b81732a6575a",
        },
        {
          id: "05515861-1659-47db-89fa-b81732a6574a",
          question: "First thing to do when you jump into a car?",
          category_id: "06615861-1659-47db-89fa-b81732a6574a",
          answer_id: "05615861-1659-47db-89fa-b81732a6574a",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("questions", null, {});
  },
};
