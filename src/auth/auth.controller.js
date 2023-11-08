import { validationResult } from 'express-validator';
import * as authService from './auth.service.js';

export const login = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { email, password } = req.body
        const loginData = await authService.login(email, password)
        if (loginData) {
            res.status(200).send({
                message: "Login Successful",
                data: loginData
            })
        } else {
            res.status(400).send({
                message: "Invalid email or password",
            })
        }
    } else {
        res.status(200).send({
            message: "Invalid login details",
            data: errors
        })
    }
}

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { email, password, userName } = req.body
        const registerData = await authService.register(email, password, userName)
        if (registerData) {
            res.status(200).send({
                message: "Registered Successful",
            })
        } else {
            res.status(400).send({
                message: "Email id already exists",
            })
        }
    } else {
        res.status(200).send({
            message: "Invalid Inputs",
            data: errors
        })
    }
}