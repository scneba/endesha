"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
          path: "/pages",
          verb: "POST",
        },
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd2bed",
          path: "/pages",
          verb: "PUT",
        },
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd3bed",
          path: "/pages",
          verb: "GET",
        },
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          path: "/pages",
          verb: "PATCH",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
