import express from "express";

const router = express.Router();

import UserController from '../controllers/UserController.js';
import checkUserAuth from "../middlewares/auth-middleware.js";


//Routelevel middle ware
router.use('/changepassword', checkUserAuth)
router.use("/loggeduser", checkUserAuth)


// public Route
router.post("/register",UserController.userRegistration)
router.post("/login", UserController.userLogin)
router.post("/send-reset-password-email", UserController.sendUserPasswordResetEmail)
router.post("/reset-password/:id/:token",UserController.userPasswordReset)

// protect Route
router.post("/changepassword",UserController.changeUserPassword )
router.get("/loggeduser",UserController.loggedUser )


export default router