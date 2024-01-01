const User=require('../Models/User')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
// const bcrypt=require('bcryptjs')
require('dotenv').config()
const fs=require('fs')
const signUp=async(req,res)=>{
    const {name,email,password}=req.body
    try{
    const existingUser=await User.findOne({
        email:email
    })
    if(existingUser){
        return res.send("the provided email is already in use , Login instead")
    }
    console.log('hwllo world!')
    const user=await User.create(req.body)
    console.log(user)

    const token=await user.token()
    const payload=jwt.verify(token,'secret')
    console.log(payload)
    res.json({user,token})
    }
    catch(error){
       console.log(error);
      res.json({message:"sorry! we incountered an error"})
    }
}
const login=async(req,res)=>{
    const {name,email,password}=req.body

    try {
        const existingUser=await User.findOne({
            email:email
        })
        if(!existingUser){
            return res.send("account not found")
        }
        if(password!=existingUser.password){
            return res.status(500).json({Message:"Incorrect password"})
        }
        console.log('hello')
        const token=await existingUser.token()
        res.json({existingUser,token})
        
    } catch (error) {
        console.log(error)

    }
    
}
const follow=async(req,res)=>{
            
}
const searchUser=async(req,res)=>{
    try {
        let {searchkey}=req.headers
        console.log('e',searchkey)
        let name={  $regex: searchkey, $options: 'i' }
        
        const users=await User.find({
            name:name
        })
        res.status(200).json({users})
    } catch (error) {
       return
    }
}
const updateUser=async(req,res)=>{
  const  {_id,name}=req.body
  let updateList={DP:{
    data: fs.readFileSync(`uploads/${req.file.filename}`),
    contentType:'image/png',
}}
  if(name){
    updateList.username=name
  }
  try {
    const user=await User.findByIdAndUpdate(_id,updateList)
    res.json({user})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}
module.exports={signUp,login,updateUser,searchUser}

