import express from 'express'


const movieRoutes=express.Router()

movieRoutes.get('/start',(req,res)=>{
    res.json({
        message : "Improve your vision"
    })
})

movieRoutes.post('/start',(req,res)=>{
    res.json({
        message : "Create your vision"
    })
})

movieRoutes.put('/start',(req,res)=>{
    res.json({
        message : "Update your vision"
    })
})

movieRoutes.delete('/start',(req,res)=>{
    res.json({
        message : "Delete this vision"
    })
})

export default movieRoutes;