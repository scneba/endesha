"use strict";
const { Model } = require("sequelize");
const { v4, validate } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //basically, an answer can be for more than one question
      Answer.hasMany(models.Question, {
        as: "questions",
        foreignKey: "answer_id",
      });
    }
  }
  Answer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      short_description: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer_md: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answers",
    },
  );

  //create the id automatically if not supplied
  Answer.beforeCreate((answer, _) => {
    let valid = validate(answer.id);
    if (!valid) {
      return (answer.id = v4());
    }
    return (answer.id = answer.id);
  });
  return Answer;
};
