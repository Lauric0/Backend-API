import express from 'express'


const userRoute = express.Router()
userRoute.get('/user_get', (req, res)=>{
    res.json({
        message:"Be confortable in the unconfortable"
    })
    
})
userRoute.post('/user_post', (req, res)=>{
    res.json({
        message:"Create opportunity"
    })
    
})

userRoute.put('/user_update', (req, res)=>{
    res.json({
        message:"Never stop learning"
    })
    
})

userRoute.post('/user_delete', (req, res)=>{
    res.json({
        message:"Reject average"
    })
    
})

export default userRoute;