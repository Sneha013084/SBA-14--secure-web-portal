
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        minLength:6,
    },
    githubId:{
        type: String,
    }

   
});
 userSchema.methods.hasAuthMethod = function() {
    return this.password || this.githubId;

 };
const User = mongoose.model("User", userSchema);

export default User;

