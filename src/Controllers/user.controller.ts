import { asyncWrapper } from "@src/ErrorHandler/asyncWrapper";
import {Request,Response} from 'express';

export const signUp=asyncWrapper(async(req:Request,res:Response)=>{
    console.log("Signup Function is triggered")
    return res.status(200).json({msg:"Signup function is triggered",body:req.body})
})