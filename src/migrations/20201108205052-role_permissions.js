"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "role_permissions",
      {
        permission_id: {
          type: DataTypes.UUID,
          references: {
            model: "permissions", // name of Target db table
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
          role_perm_unique: {
            fields: ["permission_id", "role_id"],
          },
        },
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("role_permissions");
  },
};
