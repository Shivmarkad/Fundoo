import HttpStatus from 'http-status-codes';
import * as notes from '../services/notes.service';

export const getAllNotes = async (req, res, next) => {  
    try {
      const data = await notes.getAllNotes(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };