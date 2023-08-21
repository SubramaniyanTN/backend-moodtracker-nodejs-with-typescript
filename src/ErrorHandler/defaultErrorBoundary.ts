import CustomError from './customError';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import {TokenExpiredError} from 'jsonwebtoken'

const defaultErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("ERROR >>>>>>>",err)
  if(err instanceof TokenExpiredError){
    console.log(err.expiredAt,err.message,err.name)
    return res.status(500).json({msg:"Token expired"})
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.message });
};

export default defaultErrorHandler;
