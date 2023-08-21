import { Router } from "express";
import * as controllers from '../Controllers/user.controller'

export const router=Router()

router.route("/").post(controllers.signUp).get(controllers.login)
router.route("/otpverification").post(controllers.otpVerifier)