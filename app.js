import express from 'express'
import 'dotenv/config'
import userRoute from './src/Routes/user.route.js'
import {prisma, connectdb, disconnectDB} from './src/config/database.js'
import authRouter from './src/Routes/auth.route.js'
import { watchlistRouter } from './src/Routes/watchlist.route.js'
import { authMiddleware } from './src/middlewares/auth.middleware.js'

const {PORT}= process.env
const app = express()

connectdb()

//Body parsing middleware
app.use(express.json()) // handle the json text send throught the body
app.use(express.urlencoded({extended:true})) // Converts html form content into json 




// API Routes
app.use('/home',userRoute)
app.use('/auth', authRouter)
app.use('/watchlist',watchlistRouter)

app.listen(PORT || 5001,()=>{
    console.log(`Server win the battle on port ${PORT}`)
})