import jwt from 'jsonwebtoken'
import {prisma} from '../config/database.js'


export const authMiddleware = async(req,res,next)=>{

    let token
    // Verify if there is a token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies?.jwt){
        token= req.cookies.jwt
    }

    if(!token){
        return res.status(401).json({error:"Not authorized, no token provided"})
    }
    try {
        // Verify that the token is valid and extract userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        
        // Read the user in the database
        const user = await prisma.user.findUnique({
            where:{id:decoded.id}
        })

        if(!user){
            return res
                .status(401)
                .json({ error: "User no longer exist" });
        }

        req.user = user
        next()
        
    } catch (error) {
        res.status(401).json({
            error:'Not authorized, token failed'
        })
    }
}