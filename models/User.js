import mongoose from "mongoose"
const {Schema,model} = mongoose

const userSchema = new Schema({
    email : { type: String , required: true}, 
    username : { type: String , required: true},
    name : { type: String },
    profilePic : { type: String },
    coverPic : { type: String },
    razorpaySecret : { type: String },
    razorpayId : { type: String },
    createdAt : { type: Date , default: Date.now},
    updatedAt : { type: Date , default: Date.now},
})

export default mongoose.models.User || model("User", userSchema);