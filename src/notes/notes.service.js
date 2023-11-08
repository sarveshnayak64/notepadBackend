import { pool } from "../../configs/database.js"

export const getNotesByUserId = async (userId, searchQuery) => {
    try {
        if (searchQuery !== "") {
            const result = await pool.query(`SELECT id, body, subject, "createdAt"
            FROM public.notes 
            WHERE "authorId" = $1 AND "isDeleted" = false AND subject ILIKE $2
            ORDER BY id DESC`, [userId, `%${searchQuery}%`])
            return result.rows
        } else {
            const result = await pool.query(`SELECT id, body, subject, "createdAt"
            FROM public.notes WHERE "authorId" = $1 AND "isDeleted" = false ORDER BY id DESC`, [userId])
            return result.rows
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

export const getNoteByNoteId = async (noteId) => {
    try {

        const result = await pool.query(`SELECT id, body, subject, "createdAt"
            FROM public.notes WHERE id = $1 AND "isDeleted" = false ORDER BY id DESC`, [noteId])
        return result.rows[0]
    } catch (err) {
        console.log(err)
        return false
    }
}

export const createNote = async (body, subject, userId) => {
    try {
        return await pool.query(`INSERT INTO public.notes(
            body, subject, "authorId")
            VALUES ( $1, $2, $3);`, [body, subject, userId])
    } catch (err) {
        return false
    }
}

export const updateNote = async (body, subject, id) => {
    try {
        return await pool.query(`UPDATE public.notes
        SET body=$1, subject=$2
        WHERE id = $3;`, [body, subject, id])
    } catch (err) {
        return false
    }
}

export const deleteNote = async (id) => {
    try {
        return await pool.query(`UPDATE public.notes
        SET "isDeleted" = true
        WHERE id = $1;`, [id])
    } catch (err) {
        console.log(err)
        return false
    }
}   