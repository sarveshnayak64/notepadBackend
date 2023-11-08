
import { validationResult } from 'express-validator';
import * as notesService from './notes.service.js';

export const getNotesByUserId = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const id = req.user.userId
        const searchQuery = req.params.search || ''
        const data = await notesService.getNotesByUserId(id,searchQuery)
        if (data) {
            res.status(200).send({
                data: data
            })
        } else {
            res.status(400).send({
                message: "Failed to fetch notes",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to fetch notes",
            data: errors
        })
    }
}

export const getNoteByNoteId = async (req, res) =>{
    const id = req.params.id
        const data = await notesService.getNoteByNoteId(id)
        if (data) {
            res.status(200).send({
                data: data
            })
        } else {
            res.status(400).send({
                message: "Failed to fetch notes",
            })
        }
}

export const createNote = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const authorId = req.user.userId
        const {subject, body} = req.body
        const data = await notesService.createNote(body, subject, authorId)
        if (data) {
            res.status(200).send({
                message: "Created Note Successfully",
            })
        } else {
            res.status(400).send({
                message: "Failed to create notes",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to create notes",
            data: errors
        })
    }
}

export const updateNote = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const id = req.params.id
        const {subject, body} = req.body
        const data = await notesService.updateNote(body, subject, id)
        if (data) {
            res.status(200).send({
                message: "Updated Note Successfully",
            })
        } else {
            res.status(400).send({
                message: "Failed to update notes",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to update notes",
            data: errors
        })
    }
}

export const deleteNote = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const id = req.params.id
        const data = await notesService.deleteNote(id)
        if (data) {
            res.status(200).send({
                message: "Deleted Note Successfully",
            })
        } else {
            res.status(400).send({
                message: "Failed to delete notes",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to delete notes",
            data: errors
        })
    }
}