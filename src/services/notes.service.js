import sequelize, { DataTypes } from '../config/database';
const Notes = require('../models/notes')(sequelize, DataTypes);

export const getAllNotes = async (body) => {
  const note = await Notes.findAll();
  if (note) {
    return note;
  };
  throw new Error("Unable to find");
};

export const createNote = async (body) => {
  const note = await Notes.create(body);
  if (note) {
    return note;
  };
  throw new Error("unable to create");
};


