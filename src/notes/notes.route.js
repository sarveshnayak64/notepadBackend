import express from 'express';
import { body } from 'express-validator';
import * as notesController from './notes.controller.js';
import { verifyToken } from '../auth/auth.service.js';

const router = express.Router();

router.get('/notes/:search?',verifyToken,notesController.getNotesByUserId)    
router.get('/note/:id',notesController.getNoteByNoteId)    
router.post('/note',verifyToken,[
    body('body').notEmpty().withMessage('Body cannot be blank'),
    body('subject').notEmpty().withMessage('Subject cannot be blank'),
],notesController.createNote)
router.put('/note/:id',verifyToken,[
    body('body').notEmpty().withMessage('Body cannot be blank'),
    body('subject').notEmpty().withMessage('Subject cannot be blank'),
],notesController.updateNote)
router.put('/deleteNote/:id',verifyToken,notesController.deleteNote)


export default router