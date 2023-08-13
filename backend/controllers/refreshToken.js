import jwt from 'jsonwebtoken'
import { AccountSchema } from '../models/account.model.js'

export const refreshToken = async (req, res)=>{
  try{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
      res.sendStatus(401)
    }
    const user = await AccountSchema.findOne({refreshToken: refreshToken})
    if(!user){
      return res.sendStatus(403)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decode)=>{
      
      if(err) return res.sendStatus(403)
      const accessToken = jwt.sign({id: decode.id, username: decode.username}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'20s'
      })
      res.json({accessToken})
    })
  }catch(err){
    res.json({message: err.message})
  }
}