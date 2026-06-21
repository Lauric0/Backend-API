import express from 'express'
import { addToWatchlist } from '../Controllers/watchlist.controller.js'
import { validateRequest } from '../middlewares/validate.middleware.js'
import { addToWatchlistSchema } from '../validators/watchlist.validator..js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


export const watchlistRouter = express.Router()


watchlistRouter.use(authMiddleware)

watchlistRouter.post('/add',validateRequest(addToWatchlistSchema),addToWatchlist)

// watchlistRouter.put("/id", updateWatchlistItem )

// watchlistRouter.delete("/:id", removeWatchlistItem )
