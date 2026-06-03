import express from 'express'
import register from '../Controllers/auth.controller.js'


const authRouter = express.Router()

authRouter.get('/',(req,res)=>{
    res.json({
        message:"Its ok we win everyday."
    })
})
authRouter.post('/register', register)
export default authRouter;