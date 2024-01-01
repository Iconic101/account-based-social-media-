const express=require('express')
const { upload, visiting } = require('../controller/posts')
const { signUp, login, updateUser, searchUser } = require('../controller/Users')
const router=express.Router()

router.route('/Signup').post(signUp)
router.route('/login').post(login)
router.route('/Edit').patch(upload.single('testImage'),updateUser)
router.route('/search').get(searchUser)
router.route('/visit').get(visiting)
module.exports=router