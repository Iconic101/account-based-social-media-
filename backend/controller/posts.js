const User=require('../Models/User')
const multer=require('multer')
const fs=require('fs')
const Comment= require('../Models/Comments')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})

const Post=require('../Models/postModel')
const getOne=async(req,res)=>{
    const {id}=req.params
    try {
        const post=await Post.findById(id)
        res.status(200).json({post})
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

const getPosts=async(req,res)=>{
    try {
        let userInfo=req.user
        let posts=await Post.find()
        
        let start = Date.now()
        posts.forEach( (e)=>{
            let upPost
 
            const up=async(e)=>{
                let author=await User.findById(e.AuthorID)
                if(e.DP!=author.DP){
                    upPost= await Post.findOneAndUpdate({_id:e._id},{

                        DP:author.DP
                    })
                    }
                }

             up(e)
        
         })
          posts=await Post.find().sort('-Posted')
        
        res.status(200).json({posts,userInfo})
        console.log((Date.now()-start)/1000)
    } catch (error) {
        console.log(error)
        res.status(401).send({message:error})
    }

}

//create Block
const createPostImg=async(req,res)=>{

    try {
        const savePost=new Post({
            Author:req.body.Author,
            image:{
                data: fs.readFileSync(`uploads/${req.file.filename}`),
                contentType:'image/png',
            },
            desc:req.body.desc,
            Posted:req.body.Posted,
            AuthorID:req.body.AuthorID
        })
        await savePost.save()
        console.log('successful')
        res.json({savePost})
    } catch (error) {
        console.log(error)
        res.status(500).json({messsage:"Task failed"})

    }
    
}
const createStatus=async(req,res)=>{
    try {
        const {desc,Author,AuthorID,Posted}=req.body
        const newPost=await Post.create({
            Author:Author,
            desc:desc,
            AuthorID:AuthorID,
            Posted:Posted

        })
        // console.log(newPost);
        res.send("done")

    } catch (error) {
        res.status(500).json({messsage:"Task failed"})
    }
}


const visiting=async(req,res)=>{
    try {
        const {id}=req.headers

        const user=await User.findById(id)
        const posts=await Post.find({
            AuthorID:id
        })
        res.json({posts,user})
    } catch (error) {
        res.json({message:'sorry! we expected an unexpected error'})
    }
}




const getUserposts=async(req,res)=>{
    try {
        const userId=req.user.userId
        const user=await User.findById(userId)
        const posts=await Post.find({
           AuthorID:userId
        })
        // console.log(user._id)
        res.json({posts,user})

    } catch (error) {
        console.log(error)
        res.json({message:"Server or Request Error"})
    }
}
const comment = async(req,res)=>{
       let {Comments,post_id,Author,AuthorID} = req.body
       try {
        let post = await Post.findById(post_id)
        let comment = await Comment.create({
            author:Author,
            authorID:AuthorID,
            content:Comments

        })
       let comments=[...post.comments,`${comment._id}:${comment.content}`]

    post = await Post.findByIdAndUpdate(post_id,{comments:comments},{new:true})
    res.json({post})


       } catch (error) {
           console.log(error)
          res.json({message:"failed"})
       }

       
}


const getComments = async(req,res)=>{
    
     try {
        const {post_id} = req.body
        const post = await Post.findById(post_id)
        const commentIDs =post.comments.map(comment=>{{
            return comment.split(':')[0]
        }}) 
        
        let response = []
        
        commentIDs.map(async id=>{
            let  comment = await Comment.findById(id)
            
            let Author= await User.findById(comment.authorID)
               
              console.log({Author:Author,comment:comment})
             
            
            // response.unshift({Author:Author,comment:comment})
            
        })
       

        res.json({response:response})
     } catch (error) {
        res.json({message:"error"})
     }
}




const updatePosts=async(req,res)=>{
    res.send("upadted")
}
const deletePost=async(req,res)=>{
    res.send('deleted')
}

module.exports={deletePost
               ,comment
               ,visiting,
               updatePosts,
               createPostImg,
               getPosts,
               upload,
               createStatus,
               getUserposts,
               getComments}