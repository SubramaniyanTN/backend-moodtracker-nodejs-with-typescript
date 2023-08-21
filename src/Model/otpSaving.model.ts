import { ObjectId } from "mongodb";
import {Schema, ValidatorProps, model} from "mongoose";
import { User } from "./user.model";
import { checkUserId } from "@src/validators/checkUserId";

const otpSavingModelSchema=new Schema({
    userId:{
        type:ObjectId,
        ref:(User),
        required:true,
        validate:[
            {
                validator:(value:ObjectId)=>checkUserId(value),
                message:(props:ValidatorProps)=>`${props.value} is not found`
            }
        ]
    },
    otp:{
        type:String,
        required:true,
    }
})

export const OTPSavingModel=model("OTPSavingModel",otpSavingModelSchema)