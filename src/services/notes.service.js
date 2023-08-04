import sequelize, { DataTypes } from '../config/database';
import { client } from '../config/redis';

const Notes = require('../models/notes')(sequelize, DataTypes);

export const getAllNotes = async (req) => {
  const note = await Notes.findAll({ where: { createdBy: req.body.createdBy } });
  if (note) {
    const id = req.body.createdBy.toString();
    const noteData = JSON.stringify(note);
    await client.set(id,noteData);
    return note;
  };
  throw new Error("Unable to find");
};

export const createNote = async (body) => {
  const note = await Notes.create(body);

  if (note) {
    const id = body.createdBy.toString();
    await client.del(id);
    return note;
  };
  throw new Error("unable to create note");
};

export const findNoteById = async (id, req) => {
  const note = await Notes.findOne({ where: { id: id, createdBy: req.body.createdBy } });
  if (note) {
    return note;
  };
  throw new Error("Unable to find the note");
};

export const updateNoteById = async (body, id) => {
  const note = await Notes.update({ title: body.title, description: body.description }, { where: { id: id, createdBy: body.createdBy } });
  if (note) {
    const id = body.createdBy.toString();
    await client.del(id);
    return note;
  };
  throw new Error("Unable to update the note");
};

export const deleteNoteById = async (id, body) => {
  const note = await Notes.destroy({ where: { id: id, createdBy: body.createdBy } });
  if (note) {
    const id = body.createdBy.toString();
    await client.del(id);
    return note;
  };
  throw new Error("Unable to delete note");
};

export const isArchieve = async (id, body) => {
  const archieveNote = await Notes.findOne({ where: { id: id, createdBy: body.createdBy } });
  let archieveStatus;
  archieveNote.isArchieve ? archieveStatus = false : archieveStatus = true;
  await Notes.update({ isArchieve: archieveStatus }, { where: { id: id, createdBy: body.createdBy } });
};

export const isTrash = async (id, body) => {
  const trashNote = await Notes.findOne({ where: { id: id, createdBy: body.createdBy } });
  let trashStatus;
  trashNote.isTrash ? trashStatus = false : trashStatus = true;
  const note = await Notes.update({ isTrash: trashStatus }, { where: { id: id, createdBy: body.createdBy } });
};