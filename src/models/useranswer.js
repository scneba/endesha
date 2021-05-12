"use strict";
const { Model } = require("sequelize");
const { v4, validate } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class UserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //a user answer is just for one user, a user can have many answers
      UserAnswer.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "author",
      });
      //A user answer is just for one question - a question can have many user answers
      UserAnswer.belongsTo(models.Question, {
        foreignKey: "question_id",
        as: "answered_question",
      });
    }
  }
  UserAnswer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserAnswer",
      tableName: "user_answers",
    },
  );

  UserAnswer.beforeCreate((answer, _) => {
    let valid = validate(answer.id);
    if (!valid) {
      return (answer.id = v4());
    }
    return (answer.id = answer.id);
  });
  return UserAnswer;
};
