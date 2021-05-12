"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: "06615861-1659-47db-89fa-b81732a6577a",
          name: "HighWayCode",
          description: "High Way Code Questions",
        },
        {
          id: "06615861-1659-47db-89fa-b81732a6576a",
          name: "RoadSigns",
          description: "Road signs questions",
        },
        {
          id: "06615861-1659-47db-89fa-b81732a6575a",
          name: "MTB",
          description: "Model Town Board Questions",
        },
        {
          id: "06615861-1659-47db-89fa-b81732a6574a",
          name: "Practical",
          description: "Driving Practicals",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
