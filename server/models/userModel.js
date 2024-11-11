import mongoose, { Collection } from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    }, 

    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: [true, "This email address already exist"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"],
    },

    picture: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fuser-avatar%2Fuser-avatar-male-5.html&psig=AOvVaw1X2O71KLrQo3Affvk-zp1q&ust=1731419313555000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJiX5Nq11IkDFQAAAAAdAAAAABAE"
    },

    status: {
        type: String,
        default: "Hey there i am using whatsapp"
    },

    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, 'Please make sure your password is at least 6 characters long'],
        maxLength: [64, 'Please make sure your password is maximum 64 characters']
    },


},  {
    Collection: "users",
    timestamps: "true",
});

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

export default UserModel;
