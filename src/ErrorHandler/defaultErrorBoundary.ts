import CustomError from './customError';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

const defaultErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err instanceof mongodb.MongoServerError) {
    if (err.code === 11000) {
      return res.status(409).json(`${req.body.email ? req.body.email : 'Email'} already exists`);
    }
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(403).json(err.message);
  }
  return res.status(500).json({ msg: err.message });
};

export default defaultErrorHandler;
