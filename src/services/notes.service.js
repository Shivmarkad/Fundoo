import { client } from '../config/redis';
import Note from '../models/notes.model'

export const getAllNotes = async (req) => {
  const note = await Note.find({ createdBy: req.body.createdBy });
  if (note) {
    const noteData = JSON.stringify(note);
    await client.set(req.body.createdBy,noteData);
    return note;
  };
  throw new Error("Unable to find");
};

export const createNote = async (body) => {
  const note = await Note.create(body)

  if (note) {
    await client.del(body.createdBy);
    return note;
  };
  throw new Error("unable to create note");
};

export const findNoteById = async (id, userId) => {
  const note = await Note.findOne({  _id: id, createdBy: userId});
  if (note) {
    return note;
  };
  throw new Error("Unable to find the note");
};

export const updateNoteById = async (body, id) => {
  const update = {title: body.title, description: body.description }
  const note = await Note.findByIdAndUpdate({createdBy:body.createdBy,_id:id},update, {new:true});
  if (note) {
    await client.del(body.createdBy);
    return note;
  };
  throw new Error("Unable to update the note");
};

export const deleteNoteById = async (id, userId) => {
  const note = await Note.findOneAndDelete({_id: id, createdBy: userId});
  if (note) {
    await client.del(userId);
    return note;
  };
  throw new Error("Unable to delete note");
};

export const isArchieve = async (id, body) => {
  const archieveNote = await Note.findOne({ _id: id, createdBy: body.createdBy });
  let archieveStatus;
  archieveNote.isArchieve ? archieveStatus = false : archieveStatus = true;
  await Note.findByIdAndUpdate({ id: id, createdBy: body.createdBy},{ isArchieve: archieveStatus },{new:true});
};        

export const isTrash = async (id, body) => {
  const trashNote = await Note.findOne({ _id: id, createdBy: body.createdBy});
  let trashStatus;
  trashNote.isTrash ? trashStatus = false : trashStatus = true;
  const note = await Note.findByIdAndUpdate({ id: id, createdBy: body.createdBy},{ isTrash: trashStatus },{new:true});
};