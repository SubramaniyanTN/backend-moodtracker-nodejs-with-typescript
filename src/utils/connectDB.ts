import mongoose from "mongoose"

export const connectDB=(uri:string,dbName:string)=>{
    return mongoose.connect(uri,{
        dbName:dbName
    })
}