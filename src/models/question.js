"use strict";
const { Model } = require("sequelize");
const { v4, validate } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //every question belongs to a category
      Question.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "question_category",
      });
      //A question has only one answer, although an answer can be for many questions
      Question.belongsTo(models.Answer, {
        foreignKey: "answer_id",
        as: "correct_answer",
      });

      Question.hasMany(models.UserAnswer, {
        as: "user_answers",
        foreignKey: "question_id",
      });
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      answer_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      question: {
        type: DataTypes.STRING(2000),
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
    },
  );

  //create the id automatically if not supplied
  Question.beforeCreate((question, _) => {
    let valid = validate(question.id);
    if (!valid) {
      return (question.id = v4());
    }
    return (question.id = question.id);
  });
  return Question;
};
