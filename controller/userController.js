import { ApiError } from "../Utils/apiError.js";
import User from "../model/user.js";

////////////////////////////////GET ALL USERS /////////////////////////////////////////////////
export const getAllUsers = async(req , res , next)=>{
    try {
        const Users = await User.find();
        res.status(200).json({Data : Users});
        
    } catch (error) {
        return next(new ApiError(`System Error ${error}`) , 404)
    }
};
///////////////////////////////GET USER BY ID /////////////////////////////////////////////////
export const getUerById = async(req, res ,next )=>{
    try {
        const userID = req.params.id ;
        const user = await User.findById(userID);
        res.status(200).json({user : user});
    } catch (error) {
        return next(new ApiError(`System Error ${error}`) , 404)
    }
};
//////////////////////////////DELETE USER //////////////////////////////////////////////////////
export const deleteUser = async(req , res , next )=>{
    try {
        const userID = req.params.id ;
        await User.findByIdAndDelete(userID)
        res.status(200).json({message : "This user is deleted " });
    } catch (error) {
        return next(new ApiError(`System Error ${error}`) , 404)
    }
};  
//////////////////////////////UPDATA USER //////////////////////////////////////////////////////
export const updateUser = async(req, res , next )=>{
    try {
        const userID = req.params.id ;
        const newDataOfUser = await User.findByIdAndUpdate( 
            userID, 
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({user : newDataOfUser});
    } catch (error) {
        return next(new ApiError(`System Error ${error}`) , 404);
    }
}