import { Model, Schema, ValidatorProps, model } from 'mongoose';
import { emailRegex, passwordRegex } from '@src/utils/regex';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'First name must have minimum 2 characters'],
    maxlength: [20, 'First name can have maximum 20 characters'],
    validate: [
      {
        validator: (value: string) => value.length === value.trim.length,
        message: (props: ValidatorProps) => `Please remove extra spaces from the ${props.value}`,
      },
    ],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [1, 'First name must have minimum 1 characters'],
    maxlength: [20, 'First name can have maximum 20 characters'],
    validate: [
      {
        validator: (value: string) => value.length === value.trim.length,
        message: (props: ValidatorProps) => `Please remove extra spaces from the ${props.value}`,
      },
    ],
  },
  emailID: {
    type: String,
    required:true,
    unique:true,
    validate: [
      {
        validator: (value: string) => value.length === value.trim.length,
        message: (props: ValidatorProps) => `Please remove extra spaces from the ${props.value}`,
      }
    ],
    match:[emailRegex,"Provide an Valid Email Id"]
  },
  password:{
    type: String,
    required:true,
    minlength:[7,"Password must be more than 6 characters"],
    maxlength:[20,"Password can contain maximum of 20 characters"],
    validate: [
      {
        validator: (value: string) => value.length === value.trim.length,
        message: (props: ValidatorProps) => `Please remove extra spaces from the ${props.value}`,
      },
    ],
    match:[passwordRegex,"Password must be more than 6 characters , must contain one upper case , one special characters and one number"]
  }
});

export const User=model("User",UserSchema)
