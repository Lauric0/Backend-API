import { prisma } from "../config/database.js"


const addToWatchlist = async (req,res)=>{
    const {movieId, status, rating, notes} = req.body

    // Verify if the movie exist
    const movieExist = await prisma.movie.findUnique({
        where:{id:movieId}
    })

    if(!movieExist){
        res.status(404).json({
            error:'Movie not found'
        })
    }

    // Check if the movie is already in the watchlist
    const movieInWatchlist = await prisma.watchlistItems.findUnique({
        where:{
            userId_movieId:{
                userId:req.user.id,
                movieId
            }
        }
    })

    if(movieInWatchlist){
        res.status(400).json({
            error:'Movie already exist in the watchlist'
        })
    }

    // Create the movie
    const watchlistItem = await prisma.watchlistItems.create({
        data:{
            userId:req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })
    return res.status(200).json({
        status:'Success',
        data:watchlistItem
    })
}


const removeFromWatchlist= async (req,res)=>{
    user 
}
export { addToWatchlist }