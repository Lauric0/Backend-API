import jwt from 'jsonwebtoken'
import {prisma} from '../config/db.js'


export const authMiddleware = async(req,res)=>{

    let token
    // Verify if there is a token
    if(req.headers.authorizations && req.headers.authorizations.startWith("Bearer ")){
        token = req.headers.authorizations.split(' ')[1]
    }else if(req.cookies.jwt)
}