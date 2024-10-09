'use strict'
import jwt from 'jsonwebtoken'

const secretKey='@CBC8d42e9d4f3a29b1e7cbd34f1d937fc8e3f6f86a@'

export const genereteJwt=async(payload)=>{
    try {
        return jwt.sign(payload, secretKey,{
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (error) {
        console.error(error)
        return error
    }
}