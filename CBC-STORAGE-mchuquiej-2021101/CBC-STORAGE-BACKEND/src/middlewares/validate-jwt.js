'use strict'
import jwt from 'jsonwebtoken'
import Admin from '../admin/admin.model.js'
 
export const validateJwt=async(req,res,next)=>{
    try {
        let secretKey=process.env.SECRET_KEY
        const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let {uid}=jwt.verify(token, secretKey)
 
        let admin=await Admin.findOne({_id: uid})
        if(!admin) return res.status(404).send({message: 'User not found - Unauthorized'})
        req.admin=admin
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Invalid token'})
    }
}