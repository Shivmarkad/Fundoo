import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { notesValidator } from '../validators/notes.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a note
router.post('',notesValidator, notesController.createNote); 

// to get note
router.get('',userAuth,notesController.getAllNotes)      


export default router;
