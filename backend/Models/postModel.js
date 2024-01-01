const mongoose=require('mongoose')
// const date=new date
const PostSchema=new mongoose.Schema({
    Author:{
        type:String,
        required:true
       
    },
    AuthorID:{
       type:mongoose.Types.ObjectId,
    
    },
    Posted:{
        type:Number,
        default:0
    },
    desc:{
        type:String
    },
    image:{
        data:Buffer,
        contentType:String
    },
    DP:{
        data:Buffer,
        contentType:String
    },
    likeCount:{
        type:Number,
        default:0
    },
    comments:[{type:String}]
})





module.exports=new mongoose.model("post",PostSchema)