import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { notesValidator } from '../validators/notes.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisData } from '../middlewares/redis.middleware';

const router = express.Router();

//route to create a note
router.post('', notesValidator,userAuth, notesController.createNote);

// to get note
router.get('', userAuth,redisData, notesController.getAllNotes);

//get note by id
router.get('/:id', userAuth, notesController.findNoteById);

//update note by id
router.put('/:id', userAuth, notesController.updateNoteById);

//delete note by id
router.delete('/:id', userAuth, notesController.deleteNoteById);

//archieved notes
router.put('/archieve/:id', userAuth, notesController.isArchieve);

//trashed notes
router.put('/trash/:id', userAuth, notesController.isTrash);
export default router;
