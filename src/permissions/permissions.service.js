import { pool } from "../../configs/database.js"

export const getPermisssionByUserId = async (userId) =>{
    try{
        const result = await pool.query(`SELECT *
        FROM public.permissions
        JOIN notes ON notes.id = permissions."notesId"
        WHERE permissions."userId" = $1`, [userId])
        console.log(result)
        return result.rows
    }catch(err){
        console.log(err)
        return false
    }
}   

export const createPermission = async (noteId, userId, permission) =>{
    try{
        return await pool.query(`INSERT INTO public.permissions (
            "userId", "noteId", permission)
            VALUES ( $1, $2, $3);`, [userId, noteId, permission])
    }catch(err){
        console.log(err)
        return false
    }
}   

export const updatePermission = async (permission, id) =>{
    try{
        return await pool.query(`UPDATE public.permissions
        SET permission=$1
        WHERE id = $2;`, [permission,id])
    }catch(err){
        return false
    }
}   

export const deletePermission = async (id) =>{
    try{
        return await pool.query(`DELETE FROM public.permissions
        WHERE id = $1;`, [id])
    }catch(err){
        console.log(err)
        return false
    }
}   