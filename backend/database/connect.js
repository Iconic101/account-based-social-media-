const mongoose=require('mongoose')

const connect=(URI)=>{
    mongoose.connect(URI)
}
module.exports=connect