'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notes.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      color: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      isArchieve: {type: DataTypes.BOOLEAN, defaultValue: false},
      isTrash: {type: DataTypes.BOOLEAN, defaultValue : false}
    },
    {
      sequelize,
      modelName: 'notes'
    }
  );
  return notes;
};
