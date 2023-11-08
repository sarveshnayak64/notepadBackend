import express from 'express';
import { body } from 'express-validator';
import * as authController from './auth.controller.js';

const router = express.Router();

router.post('/login', [
    body('email').notEmpty().withMessage('Email cannot be blank').isEmail().withMessage('Invalid Email'),
    body('password').notEmpty().withMessage('Password cannot be blank')
], authController.login)

router.post('/register', [
    body('email').notEmpty().withMessage('Email cannot be blank').isEmail().withMessage('Invalid Email'),
    body('userName').notEmpty().withMessage('User Name cannot be blank'),
    body('password').notEmpty().withMessage('Password cannot be blank')
], authController.register)

export default router