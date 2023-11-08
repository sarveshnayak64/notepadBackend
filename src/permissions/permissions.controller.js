
import { validationResult } from 'express-validator';
import * as permissionsService from './permissions.service.js';

export const getPermissionsByUserId = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const id = req.params.id
        const data = await permissionsService.getPermisssionByUserId(id)
        if (data) {
            res.status(200).send({
                data: data
            })
        } else {
            res.status(400).send({
                message: "Failed to fetch permissions",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to fetch permissions",
            data: errors
        })
    }
}

export const createPermission = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const {noteId, userId, permission} = req.body
        const data = await permissionsService.createPermission(noteId, userId, permission)
        if (data) {
            res.status(200).send({
                message: "Created Permission Successfully",
            })
        } else {
            res.status(400).send({
                message: "Failed to create permission",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to create permission",
            data: errors
        })
    }
}

export const updatePermission = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const id = req.params.id
        const {permission} = req.body
        const data = await permissionsService.updatePermission(permission, id)
        if (data) {
            res.status(200).send({
                message: "Updated Permission Successfully",
            })
        } else {
            res.status(400).send({
                message: "Failed to update permission",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to update permission",
            data: errors
        })
    }
}

export const deletePermission = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const id = req.params.id
        const data = await permissionsService.deletePermission(id)
        if (data) {
            res.status(200).send({
                message: "Deleted Permission Successfully",
            })
        } else {
            res.status(400).send({
                message: "Failed to delete permission",
            })
        }
    } else {
        res.status(200).send({
            message: "Failed to delete permission",
            data: errors
        })
    }
}