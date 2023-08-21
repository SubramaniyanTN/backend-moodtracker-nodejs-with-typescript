import { User } from "@src/Model/user.model"
import { ObjectId } from "mongodb"

export const checkUserId=async(id:ObjectId)=>{
    const findedUser=await User.findOne({_id:id})
    return findedUser?true:false
}