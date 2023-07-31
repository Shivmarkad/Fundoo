import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
import notes from '../models/notes';

const Notes = require('../models/notes')(sequelize, DataTypes);

export const getAllNotes = async (req) => {
  const note = await Notes.findAll({ where: { createdBy: req.body.createdBy} });
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

export const findNoteById = async (id, req) => {
  const note = await Notes.findOne({ where: { id: id , createdBy: req.body.createdBy }});
  if (note) {
    return note;
  };
  throw new Error("Unable to find the note");
};

export const updateNoteById = async (body, id) => {
  const note = await Notes.update({ title: body.title, description: body.description }, { where: {  id: id , createdBy: body.createdBy } });
  if (note) {
    return note;
  };
  throw new Error("Unable to update the note");
};

export const deleteNoteById = async (id,body) => {
  const note = await Notes.destroy({ where: {id: id ,createdBy: body.createdBy} });
  if (note) {
    return note;
  };
  throw new Error("Unable to delete note");
};

export const isArchieve = async (id,body) => {
  
  const note = await Notes.update({isArchieve:true},{ where: { id: id, createdBy: body.createdBy } });
  if (note) {
    return note;
  };
  throw new Error("Note Archieved");
};

export const isTrash = async (id,body) => {
  const note = await Notes.update({isTrash:true},{ where: { id: id, createdBy: body.createdBy } });
  if (note) {
    return note;
  };
  throw new Error("Moved to Trash");
};