
import mongoose from "mongoose";

const bookmarkSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    createdAt:{
        type: Date,
        default:Date.now,

    }
});
 const Bookmark = mongoose.model("Bookmark", bookmarkSchema)

 export default Bookmark;