"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "user_roles",
      {
        user_id: {
          type: DataTypes.UUID,
          references: {
            model: "users", // name of Target db table
            key: "id", // key in Target table that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        role_id: {
          type: DataTypes.UUID,
          references: {
            model: "roles", // name of Target db table
            key: "id", // key in Target table that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        createdAt: {
          defaultValue: DataTypes.fn("NOW"),
          type: DataTypes.DATE,
        },
        updatedAt: {
          defaultValue: DataTypes.fn("NOW"),
          type: DataTypes.DATE,
        },
      },
      {
        uniqueKeys: {
          user_Role_unique: {
            fields: ["user_id", "role_id"],
          },
        },
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("user_roles");
  },
};
