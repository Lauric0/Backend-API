import { prisma } from "../config/database.js"
import 'bcrypt'


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

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrytpt.hash(password,salt) 
    
    // Create a password
    const user = await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })

    res.status(201).json({
        status:"sucess",
        data:{
            id:user.id,
            name:name,
            email:email,
        }
    })
}


export default register;