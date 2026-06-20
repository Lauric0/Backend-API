import express from 'express'
import { addToWatchlist } from '../Controllers/watchlist.controller.js'
// import { authMiddleware } from '../middlewares/auth.middleware.js'


export const watchlistRouter = express.Router()

watchlistRouter.post('/add',addToWatchlist)
