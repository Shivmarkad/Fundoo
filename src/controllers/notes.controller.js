import HttpStatus from 'http-status-codes';
import * as notes from '../services/notes.service';

export const getAllNotes = async (req, res, next) => {
  try {
    const data = await notes.getAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const data = await notes.createNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const findNoteById = async (req, res, next) => {
  try {
    const data = await notes.findNoteById(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const updateNoteById = async (req, res, next) => {
  try {
    const data = await notes.updateNoteById(req.body,req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById = async (req, res, next) => {
  try {
    const data = await notes.deleteNoteById(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const isArchieve = async (req, res, next) => {
  try {
    const data = await notes.isArchieve();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Archieved Note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const isTrash = async (req, res, next) => {
  try {
    const data = await notes.isTrash(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Trashed notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};