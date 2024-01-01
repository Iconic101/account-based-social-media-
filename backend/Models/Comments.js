const mongoose = require('mongoose')
const CommentSchema = mongoose.Schema({
    author:{
        type:String
    },
    content:{
        type:String,
        minLength:1
    },
    authorID:{
        type:mongoose.Types.ObjectId,
     },
     reply:{
        type:String,
        default:""
     },
    date:{
        type:Number
    }
})

module.exports=new mongoose.model("comment",CommentSchema)