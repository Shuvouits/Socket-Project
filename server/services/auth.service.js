import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";

//env variables 
const {DEFAULT_PICTURE, DEFAULT_STATUS} = process.env;

export const createUser = async(userData) => {

    const {name, email, picture, status, password} = userData;

    //check if fields are empty

    if(!name || !email || !password){
        throw createHttpError.BadRequest('Please fill all fields. ')
    }

    //check name length

    if(!validator.isLength(name, {
        min: 2,
        max: 16,
    })){
        throw createHttpError.BadRequest("Please make sure name length between 2 to 16");
    }

    //check status length

    if(status && status.length > 64){
        throw createHttpError.BadRequest("Please make sure your status is less than 64 characters");
    }

    //Email validator

    if(!validator.isEmail(email)){
        throw createHttpError.BadRequest('Please make sure to provide valid email address');
    }

    //check if user already exist

    const checkDb = await UserModel.findOne({email});
    if(checkDb){
        throw createHttpError.Conflict("Please try again different email address, tjis email are already exist");
    }

    //Check password length

    if(!validator.isLength(password, {
        min: 6,
        max: 128,
    })){
        throw createHttpError.BadRequest("Please make sure your password length between 6 to 128");
    }

    



    //adding user to the database
    const user = await new UserModel({
        name,
        email, 
        picture: picture || DEFAULT_PICTURE, 
        status: status || DEFAULT_STATUS, 
        password
    }).save();

    return user;
    
}