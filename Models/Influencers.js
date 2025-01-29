const mongoose = require("mongoose");

const Influencers= mongoose.model("Influencers",{
    id:{
        type:Number,
    },
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
        required:true
        
    },
    password:{
        type:String,
        required:true,
       
    },
    blogPost:{
        type:String,
        default:'tiktok//link.com',
        
    },
    postCount:{
        type:Number,
        default:10,
    },
    submissionDate:{
        type:Date,
        default:Date.now,
    },
    Accepted:{
        type:Boolean,
        default:false,
    },
    
});

module.exports={Influencers};