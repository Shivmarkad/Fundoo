import { where } from 'sequelize';
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
  throw new Error("unable to create note");
};

export const findNoteById = async (id) => {
  const note = await Notes.findOne({ where: { id: id } });
  if (note) {
    return note;
  };
  throw new Error("Unable to find the note");
};

export const updateNoteById = async (body,id) => {
  const note = await Notes.update({ title: body.title, description: body.description }, { where: { id:id } });
  if (note) {
    return note;
  };
  throw new Error("Unable to update the note");
};

export const deleteNoteById = async (id) => {
  const note = await Notes.destroy({ where: { id: id } });
  if (note) {
    return note;
  };
  throw new Error("Unable to delete note");
};