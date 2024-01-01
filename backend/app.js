//imports
require('dotenv').config()
const express= require('express')
const app=express()
const connect=require('./database/connect')
const cors=require('cors')
const bodyParser=require('body-parser')
const userRouter=require('./Routes/User')
const postRouter=require('./Routes/post')

const port=5000
//Middlewares
app.use(cors())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
    

//routes
app.use('/photoShare',postRouter)

app.use('/',userRouter)

const start=async()=>{
    console.log('connecting to database')
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`The server is listining on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()



