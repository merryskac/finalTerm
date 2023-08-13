import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'
import { AccountSchema, updateRefreshToken } from '../models/account.model.js'

//delete this
export const requireAuth = (req, res, next) => {
  const token = req.cookies.token
  if(!token){
    return res.status(403).json({message: "unautenticated"})
  }
  jwt.verify(token, process.env.JWT_SECRET, 
    (err, decodedToken)=>{
      if(err){
        res.status(401).json("unauthenticated")
        return
      }
      next()
  })
}

export const verifyToken = (req,res,next)=>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token === null){
    return res.status(401).json({message: 'unauthorized'})
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
    if(err){
      res.status(403).json({message:'forbidden'})
      return
    }
    req.id = decoded.id
    next()
  })
}

export const checkToken =  (req, res) =>{
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  const refreshToken = req.cookies.refreshToken
  const nullObj = null
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err, decoded)=>{
    if(err){
      
      if(err.name==='TokenExpiredError'){
        const updateDb = async()=>{
          const data = await AccountSchema.findOneAndUpdate({refreshToken: refreshToken},{refreshToken: null})
        }
        updateDb()
        res.cookie('refreshToken','',{maxAge: 1}).status(403).json({message:'please relogin'})
        return
      }
      res.status(403).json({message:err.message})
      return
    }
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
      if(err) {
        if(err.name ==='TokenExpiredError'){
          const getRefreshToken = async()=>{
            const data = await AccountSchema.findOne({refreshToken:refreshToken})
            return {id:data._id, username:data.username}
          }
          getRefreshToken().then(dataUser=>{
            console.log(dataUser)
          const accessToken = jwt.sign({id: dataUser.id, username: dataUser.username}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1h'
          })
          return res.status(200).json({message: 'access token refreshed', accessToken:accessToken,
          username:dataUser.username
        })
          })
        }else{
          res.status(500).json({message: err.message})
          return
        }
      }else{
      return res.status(200).json({
        accessToken: accessToken,
        username:decoded.username
      })
    }
    })
  })
}