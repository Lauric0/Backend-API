import { prisma } from "../config/database.js"
import bcrypt from 'bcrypt'
import {generateToken} from "../utils/generateToken.js"


const register = async(req,res)=>{

    const {name, email, password}= req.body

    const userExist = await prisma.user.findUnique({
        where:{email:email}
    })

    if(userExist){
        return res.status(400).json({
            error:"User already exist with this email"
        })
    }
    // Create a password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create a user 
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    // Generate token
    const token = generateToken(user.id,res)

    res.status(201).json({
        status:"success",
        data :{
            user:{id:user.id,
                name:name,
                email:email,
            },
            token
        }
    })

}

const login = async (req,res)=>{
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where:{email:email}
    })

    if(!user){
        return res.status(400).json({
            message:"This email doesn't exist"
        })
    }

    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword){
        return res.status(400).json({
            message:'Incorrect password'
        })
    }

    // Generate token
    const token = await generateToken(user.id,res)


    return res.status(200).json({
        data:{
            user:{
                id:user.id,
                user:user.name,
                email:email},
            token
        }
    })

}

const logout = async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({
        status:"Success",
        message:'Logged out successfully'
    })
}

export {register,login, logout}