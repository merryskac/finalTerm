import express from 'express'
import mongoose  from 'mongoose'
import appRouters from '../routers/channel.js';
import vidRouters from '../routers/product.js';
import commentRouters from '../routers/comment.js'
import '../routers/Account.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express()

app.options('*', cors())

app.use(cors({credentials: true, origin:'http://127.0.0.1:5173'}))

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// app.use(cors())
mongoose.connect(process.env.MONGO_URI)
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

app.use((req,res,next)=>{
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  next()
})

app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
  res.json('haloo00')
})
app.use('/play',appRouters)


app.listen(process.env.PORT,()=>{
  console.log('server open!')
})