import HttpStatus from 'http-status-codes';
import * as notes from '../services/notes.service';

export const getAllNotes = async (req, res, next) => {  
    try {
      const data = await notes.getAllNotes();
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
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
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    next(error);
  }
};