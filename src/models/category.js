"use strict";
const { v4, validate } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Question, {
        as: "categories",
        foreignKey: "category_id",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          max: 50,
        },
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
    },
  );

  //create the id automatically if not supplied
  Category.beforeCreate((category, _) => {
    let valid = validate(category.id);
    if (!valid) {
      return (category.id = v4());
    }
    return (category.id = category.id);
  });
  return Category;
};
