import express from 'express'
import mongoose  from 'mongoose'
import appRouters from '../routers/channel.js';
import vidRouters from '../routers/product.js';
import commentRouters from '../routers/comment.js'
import '../routers/Account.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express()

// app.use(cors({credentials: true, origin:'https://final-fe-git-main-wheytosharepalu-gmailcom.vercel.app', optionsSuccessStatus: 200, methods:['GET','POST'],allowedHeaders:['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization']}))

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.8:5173/");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });



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

// app.use((req,res,next)=>{
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   next()
// })

app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
  res.json('haloo00jhhh')
})
app.use('/play',appRouters)


app.listen(process.env.PORT,()=>{
  console.log('server open!')
})