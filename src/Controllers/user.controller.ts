import { asyncWrapper } from '@src/ErrorHandler/asyncWrapper';
import { User } from '@src/Model/user.model';
import { passwordRegex } from '@src/utils/regex';
import { accessTokenGenerator, accessTokenVerifier, refreshTokenGenerator } from '@src/utils/tokenGenerator';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { otpGenerate } from '@src/utils/otpGenerator';
import { emailSender } from '@src/utils/emailSender';
import { OTPSavingModel } from '@src/Model/otpSaving.model';

export const signUp = asyncWrapper(async (req: Request, res: Response) => {
  const { firstName, lastName, emailID, password } = req.body;
  const emailIDExists = await User.findOne({ emailID: emailID });
  if (emailIDExists && !emailIDExists.isVerified) {
    const otp = otpGenerate();
    const otpSaved = await new OTPSavingModel({ userId: emailIDExists._id, otp: await bcrypt.hash(otp, 10) }).save();
    emailSender(otp, emailIDExists.emailID);
    return res.status(403).json({
      msg: 'Email already exists but you are not verified yet ,OTP is send to your mail , please verify it and login',
    });
  }
  if (!passwordRegex.test(password))
    return res.status(203).json({
      msg: 'Password must be more than 6 characters , must contain one upper case , one special characters and one number',
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, typeof hashedPassword);
  const userSaved = await new User({
    firstName: firstName,
    lastName: lastName,
    emailID: emailID,
    password: hashedPassword,
  }).save();
  const otp = otpGenerate();
  const otpSaved = await new OTPSavingModel({ userId: userSaved._id, otp: await bcrypt.hash(otp, 10) }).save();
  emailSender(otp, userSaved.emailID);
  return res.status(200).json({ msg: userSaved });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const userFromDB = await User.findOne({ emailID: req.body.emailID });
  if (!userFromDB) return res.status(404).json('Invalid Email or Password');
  const passwordCompare = await bcrypt.compare(req.body.password, userFromDB?.password);
  if (passwordCompare && !userFromDB.isVerified) {
    const otp = otpGenerate();
    const otpSaved = await new OTPSavingModel({ userId: userFromDB._id, otp: await bcrypt.hash(otp, 10) }).save();
    emailSender(otp, userFromDB.emailID);
    return res.status(403).json({
      msg: 'You are not verified yet ,OTP is send to your mail , please verify it and login',
    });
  }
  if (!userFromDB.isVerified) {
    const otp = otpGenerate();
    const otpAlreadyInDB = await OTPSavingModel.findOne({ userId: userFromDB._id });
    if (otpAlreadyInDB) {
      const otpSaved = await OTPSavingModel.findOneAndUpdate(
        { userId: userFromDB._id },
        { otp: await bcrypt.hash(otp, 10) },
        { new: true }
      );
    } else {
      const otpSaved = await new OTPSavingModel({ userId: userFromDB._id, otp: await bcrypt.hash(otp, 10) }).save();
    }
    emailSender(otp, userFromDB.emailID);
    return res.status(401).json({ msg: 'OTP Sent to your mail , please verify account' });
  }
  if (!passwordCompare) return res.status(401).json({ msg: 'Invalid Email or Password' });
  const accessToken = accessTokenGenerator({ type: 'login', data: userFromDB.toJSON() });
  const refreshToken = refreshTokenGenerator({ type: 'login', data: userFromDB.toJSON() });
  return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
});

export const otpVerifier = async (req: Request, res: Response) => {
  const otpInDB = await OTPSavingModel.findOne({ userId: req.body.userId });
  if (!otpInDB) return res.status(404).json({ msg: 'Cannot match otp , please try again by resent OTP' });
  const otpMatch = await bcrypt.compare(req.body.otp, otpInDB.otp);
  if (!otpMatch) return res.status(401).json({ msg: 'OTP Mismatch' });
  const userUpdated = await User.findOneAndUpdate({ _id: req.body.userId }, { isVerified: true }, { new: true });
  return res.status(200).json({ msg: 'user verified successfully', userUpdated });
};

export const resendOTP = async (req: Request, res: Response) => {
  const userExists = await User.findOne({ emailID: req.body.emailID });
  if (!userExists) return res.status(404).json({ msg: 'User not found ' });
  const otpExists = await OTPSavingModel.findOne({ userId: userExists._id });
  const otp = otpGenerate();
  if (otpExists) {
    const otpUpdate = await OTPSavingModel.findOneAndUpdate({ userId: req.body.emailID }, { otp: otp }, { new: true });
  } else {
    const otpSaved = await new OTPSavingModel({ userId: userExists._id, otp: await bcrypt.hash(otp, 10) }).save();
  }
  emailSender(otp, req.body.emailID);
  return res.status(200).json({msg:"OTP sent successfully"})
};
