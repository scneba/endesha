"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("answers", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      short_description: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      answer: {
        type: Sequelize.STRING(50000),
        allowNull: false,
      },
      answer_md: {
        type: Sequelize.STRING(50000),
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
    await queryInterface.dropTable("answers");
  },
};
