"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "permissions",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        path: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        verb: {
          type: DataTypes.ENUM("POST", "GET", "PUT", "PATCH", "DELETE"),
          allowNull: false,
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
          path_verb_unique: {
            fields: ["path", "verb"],
          },
        },
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("permissions");
  },
};
