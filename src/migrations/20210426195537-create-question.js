"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "categories", // name of Target db table
          key: "id", // key in Target table that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      answer_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "answers", // name of Target db table
          key: "id", // key in Target table that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      question: {
        type: Sequelize.STRING(2000),
        unique: true,
        allowNull: false,
      },
      createdAt: {
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("questions");
  },
};
