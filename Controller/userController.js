import { userModel } from "../Model/userModel.js";
import { zodValSchema } from "../Validation/zodSchema.js";
import { hashing } from "../Validation/hashingPassW.js";
import { ZodError } from "zod";


export const showAllUsers = async(req,res) => {
    try{
        const allUsers = await userModel.find();
    if(allUsers.length === 0) {
        res.status(404).json({
            success: false,
            message: "No users listed",
            users: []
        })
    } else {
        res.status(200).json({
            success: true,
            message: "User list",
            users: allUsers
        })
    }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}

export const createNewUser = async(req,res) => {
    try{
        const validFormat = await zodValSchema.parseAsync(req.body);
        const safePassword = await hashing(validFormat.password);
        const newUser = await userModel.create({
            ...validFormat,
            password: safePassword
    });
        if(!newUser) {
             return res.status(401).json({
                success: false,
                message: "No new user was created"
            })
        } else {
             res.status(201).json({
                success: true,
                message: "New user created successfully",
                user: newUser
            })
        }
    }catch(error) {
        if(error instanceof ZodError) {
           return res.status(400).json({
            success: false,
            message: "Error Request",
            error: error.issues,
        })
        } 
         else {
            res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        }
    }
}