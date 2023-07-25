import sequelize, { DataTypes } from '../config/database';
const Notes = require('../models/notes')(sequelize, DataTypes);

export const getAllNotes = async (body) => {
    const user = await User.findAll({ where: { email: body.email } });
    if (user) {
      throw new Error();
    };
    return data.email;
  };