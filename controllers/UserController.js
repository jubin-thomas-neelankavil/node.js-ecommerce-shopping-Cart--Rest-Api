import UserModel from "../models/User.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import transporter from '../config/emailConfig.js';

class UserController {
    //SIGNUP
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.send({ status: "faild", message: "Email already exists" });
        } else {
            if (name && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashpassword = await bcrypt.hash(password, salt);
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            tc: tc,
                        });
                        await doc.save();

                        const saved_user = await UserModel.findOne({ email: email });

                        //GENERATE JWT TOKEN
                        const token = jwt.sign(
                            { userId: saved_user._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "5d" }
                        );
                        res
                            .status(201)
                            .send({
                                status: "success",
                                message: "Registration Success",
                                token: token,
                            });
                    } catch (error) {
                        console.log(error);
                        res.send({ status: "faild", message: "Unable to register" });
                    }
                } else {
                    res.send({
                        status: "faild",
                        message: "password and confirm password doesn't match",
                    });
                }
            } else {
                res.send({ status: "faild", message: "All field are required" });
            }
        }
    };

    //LOGIN
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const saved_user = await UserModel.findOne({ email: email });

            if (email && password) {
                const user = await UserModel.findOne({ email: email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email && isMatch) {
                        //Generate JWT Token
                        const token = jwt.sign(
                            { userID: saved_user._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "5d" }
                        );
                        res.send({
                            status: "success",
                            message: "login success",
                            token: token,
                        });
                    } else {
                        res.send({
                            status: "faild",
                            message: "Email or Password is Not Valid",
                        });
                    }
                } else {
                    res.send({ status: "faild", message: "Your not a registered user" });
                }
            } else {
                res.send({ status: "faild", message: "All Field Are required" });
            }
        } catch (error) {
            console.log(error);
            res.send({ status: "faild", message: "Unble to login" });
        }
    };

    ////CHANGE PASSWORD
    static changeUserPassword = async (req, res) => {
        const { password, password_confirmation } = req.body
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
                res.send({ "status": "success", "message": "Password changed succesfully" })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }

    //logged user

    static loggedUser = async (req, res) => {
        res.send({"user":req.user})
        
    }
//send reset password email 
    static sendUserPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
            const user = await UserModel.findOne({ email: email })
            if (user) {
                console.log(user,"user+++")
                const secret = user._id + process.env.JWT_SECRET_KEY

                const token = jwt.sign(
                    { userID: user._id }, secret, { expiresIn: "15m" })
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                console.log(link)
                //send email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "password reset link",
                    html:`<a href=${link}>Click Here</a> to reset your password`
                })
                res.send({ "status": "success", "message": "Password Reset Email Send...please check your Email", "info":info})
                
            } else {
                res.send({ "status": "failed", "message": "Email doesn't exists" })
    
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })

        }
    }

    // reset password

    static userPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body
        const { id, token } = req.params
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if (password && password_confirmation) {
                if (password !== password_confirmation) {
                    res.send({ "status": "failed", "message": "New Password And Confirm Password doesn't match" })

                } else {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
                    res.send({ "status": "success", "message": "password reset successfully" })

                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })

            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;
