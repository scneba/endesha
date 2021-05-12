"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "role_permissions",
      [
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd2bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd3bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd3bed",
          role_id: "2d7bb01e-9159-4ff5-ab5e-464345b704a4",
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
    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
