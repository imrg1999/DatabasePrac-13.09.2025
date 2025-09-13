import { userModel } from "../Model/userModel.js";


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