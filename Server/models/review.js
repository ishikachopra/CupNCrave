const mongoose = require("mongoose");

const ReviewSchema=new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
} ,{ timestamps: true },
);

const Reviews=mongoose.model("reviews",ReviewSchema);

module.exports=Reviews;
