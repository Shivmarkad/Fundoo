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

//delete notes by ids
router.delete('', userAuth, notesController.deleteNotesByIds);

//get note by id
router.get('/:_id', userAuth, notesController.findNoteById);

//update note by id
router.put('/:_id', userAuth, notesController.updateNoteById);

//delete note by id
router.delete('/:_id', userAuth, notesController.deleteNoteById);

//archieved notes
router.put('/archieve/:_id', userAuth, notesController.isArchieve);

//trashed notes
router.put('/trash/:_id', userAuth, notesController.isTrash);
export default router;
