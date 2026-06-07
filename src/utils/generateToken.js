import jwt from 'jsonwebtoken'

const generateToken= async (userId, res)=>{
    const payload = { id:userId }; // The id is an object
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || "7d"}
    )
    res.cookie("jwt",token,{
        httpOnly:true, // le cookie ne peux être lu par js ()
        secure:process.env.NODE_ENV === "production", // le fichier est lu uniquement par https
        sameSite:"strict", // Protège contre CSRF
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return token
}

export {generateToken};