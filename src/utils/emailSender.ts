import nodemailer from "nodemailer";
import {Request,Response} from 'express'
import dotenv from 'dotenv'

dotenv.config();
const senderEmailId=process.env.EMAIL_ID
const senderEmailPassword=process.env.EMAIL_ID_PASSWORD

export const emailSender = async (otp:string,emailId:string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: senderEmailId,
        pass: senderEmailPassword,
      },
    });

    const info = await transporter.sendMail({
      from: senderEmailId,
      to: emailId,
      subject: "OTP for Mood tracker",
      text: `confirm OTP for mood tracker login = ${otp}`,
    });
    return info
  } catch (error) {
    console.log(error);
  }
};
