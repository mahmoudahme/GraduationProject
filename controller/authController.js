import bcrypt from "bcrypt" ;
import {ApiError} from "../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import User from "../model/user.js";
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'})

///////////////////////////////////REGISTER TO SYSTEM ////////////////////////////////////////////////
export const register = async (req , res , next )=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName ,
            email: req.body.email,
            password: hashedPassword,
            isAdmin :req.body.isAdmin
        });
        await newUser.save();
        res.status(200).json({message : "userCreated" , userdata : newUser});
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}

///////////////////////////////////LOGIN TO SYSTEM ////////////////////////////////////////////////

export const login = async(req , res , next )=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return next(new ApiError("User not found!" , 404));  
        } 
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            return next(new ApiError("password isn't correct" , 400)) ; 
        }
        const token = JsonWebToken.sign({id : user._id , isAdmin : user.isAdmin} , process.env.JWT) ;
        const { password, isAdmin, ...otherDetails } = user._doc; 
        res.cookie("accessToken" , token , {httpOnly: true,}).status(200).json({ details: { ...otherDetails }, isAdmin });
        
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404))
    }
}