import express from 'express'
import { config } from 'dotenv'
import {prisma, connectDB, disconnectDB} from './config/db.js'



// Import Routes
import movieRoutes from './Routes/movies.routes.js'

prisma()
connectDB()

const app=express()

// API routes
app.use('/movies',movieRoutes)

const PORT = process.env["PORT"]
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})