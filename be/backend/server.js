import express from 'express'
import mongoose  from 'mongoose'
import appRouters from './routers/channel.js';
import vidRouters from './routers/product.js';
import commentRouters from './routers/comment.js'
import './routers/Account.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    ()=>{console.log('connect to db')},
    err=>{console.log(err)}
  )
// const database = mongoose.connection;

// database.once('connected',()=>{
//   console.log('Database Connected!')
// })

// database.on('error',(error)=>{
//   console.log(error)
// })

const app = express()
app.use(cors({credentials: true, origin:'http://localhost:5173'}))

app.use(express.json())
app.use(cookieParser())

app.use('/play',appRouters)


app.listen(process.env.PORT,()=>{
  console.log('server open!')
})