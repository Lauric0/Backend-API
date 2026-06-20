import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
})

const connectdb = async ()=>{
    try {
        await prisma.$connect();
        console.log('Connected via prisma');
    } catch (error) {
        console.error(`${error.message}`)
        process.exit(1)
    }
}

const disconnectDB = async ()=>{
    await prisma.$disconnect()
}

export {prisma, connectdb, disconnectDB}