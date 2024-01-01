const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    try {
        const {authorization}=req.headers

        if(!authorization||!authorization.startsWith('Bearer')){
            return res.status(500).json({message:'bad request'})
        }
        const token=authorization.split(' ')[1]

        const payload=jwt.verify(token,'secret')
        req.user=payload
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'bad request'})
    }
  next();
}
module.exports=auth