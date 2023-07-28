import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { notesValidator } from '../validators/notes.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a note
router.post('', notesValidator,userAuth, notesController.createNote);

// to get note
router.get('', userAuth, notesController.getAllNotes);

//archieved notes
router.post('/archieve/:id', userAuth, notesController.isArchieve);

//trashed notes
router.post('/trash/:id', userAuth, notesController.isTrash);

//get note by id
router.get('/:id', userAuth, notesController.findNoteById);

//update note by id
router.put('/:id', userAuth, notesController.updateNoteById);

//delete note by id
router.delete('/:id', userAuth, notesController.deleteNoteById);

export default router;
