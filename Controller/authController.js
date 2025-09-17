import { userModel } from "../Model/userModel.js";
import { zodValSchema } from "../Validation/zodSchema.js";
import { hashing } from "../Validation/hashingPassW.js";
import { ZodError } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from "../Middleware/authMiddleware.js";

export const registerAUser = async(req,res) => {
    try{
        const registerFormat = await zodValSchema.parseAsync(req.body);
        const existingUser = await userModel.findOne({
            email: registerFormat.email
        });
        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            })
        }
        const secureNewPassword = await hashing(registerFormat.password);
        
        const newRegisteredUser = await userModel.create({
            ...registerFormat,
            password: secureNewPassword
        })
        const{password, ...userWithoutPassword} = newRegisteredUser.toObject();
        if(!newRegisteredUser) {
           return res.status(500).json({
                success: false,
                message: "Registration request failed"
            })
        } else {
            return res.status(201).json({
                success: true,
                message: "Registration complete!",
                user: userWithoutPassword
            })
        }
    }catch(error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
            success: false,
            message: "Invalid request",
            error: error.issues
        })
        } else {
        console.error(error.message);
       return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    }
}

export const loginUser = async(req,res) => {
    try{
        const logInFormat = await zodValSchema.parseAsync(req.body);
        const checkExistence = await userModel.findOne({
            email: logInFormat.email
        })
        if(!checkExistence) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }
        const checkPasswordValidity = await bcrypt.compare(logInFormat.password, checkExistence.password);
        if(!checkPasswordValidity) {
            return res.status(404).json({
                success: false,
                message: "Invalid Password, Retry!"
            })
        }
        const{password, ...withoutPassword} = checkExistence.toObject();
        const token = jwt.sign({
            id: checkExistence._id,
            email: checkExistence.email
        }, process.env.JWT_Secret,
      {expiresIn: "1h"});
      if(!token) {
         return res.status(400).json({
            success: false,
            message: "No token found"
        })
      } else {
         return res.status(200).json({
            success: true,
            message: "Loggedin Successfully",
            user: withoutPassword,
            token: token
        })
      }
    } catch(error) {
         console.error(error.message);
       return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}