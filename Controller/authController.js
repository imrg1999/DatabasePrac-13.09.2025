import { userModel } from "../Model/userModel.js";
import { zodValSchema } from "../Validation/zodSchema.js";
import { hashing } from "../Validation/hashingPassW.js";
import { ZodError } from "zod";

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