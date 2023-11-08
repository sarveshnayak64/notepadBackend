
import crypto from 'crypto'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { pool } from '../../configs/database.js';

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

function sha256(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

function comparePasswords(plainPassword, hashedPassword) {
    const hashedInputPassword = hashPassword(plainPassword);
    return hashedInputPassword === hashedPassword;
}


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    try {
        const user = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ err })
    }

}

export const login = async (email, password) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1',[email])
    const row = result.rows
    if(comparePasswords(password, row[0]?.password)){
        const payload = {
            userName : row[0]?.userName,
            email: row[0]?.email,
            userId: row[0]?.id
        }

        return {token: jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })}
    }
    return false
}

export const register  = async (email, password, userName) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1',[email])
    const rows = result.rows
    if(rows.length > 0){
        return false
    }else{
        try{
            await pool.query(`INSERT INTO public."users"(
                "userName", "email", "password")
                VALUES ($1, $2, $3);`,[userName,email,sha256(password)])
                return true
        }catch(err){
            return false
        }
    }
}
