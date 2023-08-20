import nodemailer from "nodemailer";
import {Request,Response} from 'express'
import dotenv from 'dotenv'

dotenv.config();
const senderEmailId=process.env.EMAIL_ID
const senderEmailPassword=process.env.EMAIL_ID_PASSWORD

export const emailSender = async (req:Request, res:Response) => {
  console.log("Consoling");
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
      to: "subramaniyanmaddy@gmail.com",
      subject: "Just a node mailer testing mail",
      text: "This is a testing mail id from Mood tracker App ",
    });
    res.status(200).json({
      info: info,
    });
  } catch (error) {
    console.log(error);
  }
};
