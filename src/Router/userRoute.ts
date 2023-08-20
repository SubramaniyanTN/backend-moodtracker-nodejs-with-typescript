import { Router } from "express";
import * as controllers from '../Controllers/user.controller'

export const router=Router()

router.route("/").post(controllers.signUp)