import express from 'express';
import { body } from 'express-validator';
import * as permissionsController from './permissions.controller.js';
import { verifyToken } from '../auth/auth.service.js';

const router = express.Router();

router.get('/permissions/:id',verifyToken,permissionsController.getPermissionsByUserId)    
router.post('/permission', verifyToken ,[
    body('noteId').notEmpty().withMessage('Post Id cannot be blank'),
    body('userId').notEmpty().withMessage('User Id cannot be blank'),
    body('permission').notEmpty().withMessage('Permission cannot be blank'),
],permissionsController.createPermission)
router.put('/permission/:id',verifyToken ,[
    body('permission').notEmpty().withMessage('Permission cannot be blank'),
],permissionsController.updatePermission)
router.delete('/permission/:id', verifyToken,permissionsController.deletePermission)


export default router