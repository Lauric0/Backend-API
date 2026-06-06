import { prisma } from "../config/database.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js"


const register = async (req,res)=>{
    const body= req.body
    const {name, email, password} = body

    const userExist = await prisma.user.findUnique({
        where: {email: email},
    })
    if(userExist){
        return res
            .status(400)
            .json({error: 'User already exist with this email'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    /// Generate the token
    const token = generateToken(user.id)

    res.status(201).json({
        status:"success",
        data:{
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                password:user.password
            },
            token
        }
    })
}

const login = async (req,res)=>{

    const {email, password}=req.body

    // Check if email exist in the table
    const user = await prisma.user.findUnique({
        where:{email:email}
    })

    if(!user){
        return res.status(400).json({error:'User already exists with this email'})
    }

    // Verify the password

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword){
        return res.status(401).json({
            error: "Invalid email or password"
        })
    }

    // Generate  the JWT Token
    const token = generateToken(user.id, res)


    res.status(201).json({
        status:"success",
        data:{
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password
        },
        token
    })

}

const logout = (req,res)=>{
    res.status(200).json({
        status:"success",
        message:"Log Out successfully",

    })


}

export {register, login, logout};
