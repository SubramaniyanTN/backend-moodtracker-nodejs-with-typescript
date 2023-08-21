import otpGenerator from 'otp-generator'

export const otpGenerate=()=>{
    return otpGenerator.generate(6,{digits:true})
}