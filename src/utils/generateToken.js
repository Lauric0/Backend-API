import jwt from "jsonwebtoken"
import 'dotenv/config'


export const generateToken = (userId)=>{
    const payload = { id:userId }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expireIn:process.env.JWT_EXPIRES_IN || "7d",

    })

    res.cookie("jwt", token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return token;
}