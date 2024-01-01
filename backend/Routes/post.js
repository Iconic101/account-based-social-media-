const express=require('express')
const { getPosts,comment,upload, createPostImg, createStatus,getComments, getUserposts } = require('../controller/posts')
const router=express.Router()
const authMiddleware=require('../controller/auth')
router.route('/feed').get(authMiddleware,getPosts)
router.route('/create').post(upload.single('testImage'),createPostImg)
router.route('/user/post').get(authMiddleware,getUserposts)
router.route('/createStatus').post(createStatus)
router.route('/comment').post(comment).get(getComments)
module.exports=router


