const mongoose= require('mongoose')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const UserSchema=new mongoose.Schema({
    name:{
     type:String,
     
    }
    ,email:{
        type:String,
        // required:true,
        unique:true

    },
    followers:[{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    following:{
        type:Number,
        default:0
    }
    ,
    password:{
        type:String,
        minLength:6,
        required:true
        
    },
    DP:{
        data:Buffer,
        contentType:String
    }
})
UserSchema.methods.token=async function(){
    return jwt.sign({userId:this._id,username:this.name},'secret',{
        expiresIn:'30d'
    })
}


module.exports=mongoose.model("user",UserSchema)