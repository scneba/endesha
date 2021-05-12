"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      path: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "images",
    },
  );
  Image.beforeCreate((image, _) => {
    let valid = validate(image.id);
    if (!valid) {
      return (image.id = v4());
    }
    return (image.id = image.id);
  });
  return Image;
};
