import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/connectDB'
import { RouteNotFound } from './utils/routeNotFound'
import defaultErrorHandler from './ErrorHandler/defaultErrorBoundary'
dotenv.config()



const app=express()

app.use(RouteNotFound)
app.use(defaultErrorHandler)


const uri=process.env.MONGO_URI
const dbName=process.env.MONGO_DB_NAME
const port=process.env.MONGODB_PORT


const startServer=async()=>{
    if(!uri)throw Error("Define URI Environment variable")
    if(!dbName)throw Error("Define DBName Environment variable")
    await connectDB(uri,dbName)
    app.listen(port,()=>{
        console.log(`server is listening on port ${port}`)
    })
}

startServer()


