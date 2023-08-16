const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
import HttpStatus from 'http-status-codes';
import * as notes from '../services/notes.service';

export const getAllNotes = async (req, res, next) => {
  try {
    const data = await notes.getAllNotes(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
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
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
export const findNoteById = async (req, res, next) => {
  try {
    const data = await notes.findNoteById(req.params._id, req.body.createdBy);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
export const findNoteByIdWithCap = async (req, res, next) => {
  try {
    const data = await notes.findNoteById(req.params._id, req.body.createdBy);
    console.log("this is the title",data.title)
    const title = data.title;
    const worker = new Worker('./src/controllers/getNoteWorker.js', { workerData: {title} });
    
    worker.on('message', (message) => {
      const { result } = message;
      console.log('Result from worker:', result);
      data.title = result;
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
export const updateNoteById = async (req, res, next) => {
  try {
    const data = await notes.updateNoteById(req.body, req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
export const deleteNotesByIds = async (req, res, next) => {
  try {
    const noteIdsToDelete = req.body.ids;
    const userId = req.body.createdBy;

    const data = await Promise.all(noteIdsToDelete.map(async (value) => {
      const result = await notes.deleteNoteById(value, userId);
      return result._id;
    }));

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Notes deleted successfully'
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const deleteNoteById = async (req, res, next) => {
  try {
    const data = await notes.deleteNoteById(req.params._id, req.body.createdBy);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
export const isArchieve = async (req, res, next) => {
  try {
    const data = await notes.isArchieve(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Archieved successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
export const isTrash = async (req, res, next) => {
  try {
    const data = await notes.isTrash(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Trashed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};