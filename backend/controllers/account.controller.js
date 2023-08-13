import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import { AccountSchema, findUsername } from "../models/account.model.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createToken = (id) =>{
  return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: '1h'
  })
}

export const Login =async (req, res)=>{
  const {username, password} = req.body
  const getUsername = await AccountSchema.findOne({username: username})
  if(!getUsername){
    return res.status(404).json({message: "username not found"})
  }
  const auth = await bcrypt.compare(password, getUsername.password);
  if(auth){
    const refreshToken = jwt.sign(
      {id:getUsername._id, username: getUsername.username}, 
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )

    const token = jwt.sign({id:getUsername._id, username: getUsername.username}, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: '1h'
    })

    await AccountSchema.findByIdAndUpdate(getUsername._id, {refreshToken: refreshToken})

    res.cookie('refreshToken', refreshToken, 
    {
      httpOnly: true, 
      maxAge: 24*60*60*1000
    })

    return res.status(200).json({user: getUsername._id, username: getUsername.username, access_token: token})
  }
  res.status(400).json({message: "wrong password"})
}

export const Register = async (req, res)=>{
  const {password, username} = req.body
  if(await findUsername(username)){
    return res.status(403).json({"message":"username already exist. Switch to other username"})
  }
  try{
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password,  salt)
    const newAccount = await new AccountSchema(
      {
        username:username, 
        password: hashedPass
      }
      ).save()
    const token = createToken(newAccount._id)

    const refreshToken = jwt.sign(
      {id:newAccount._id, username: newAccount.username}, 
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d'
      })

    await AccountSchema.findByIdAndUpdate(newAccount._id, {refreshToken: refreshToken})

    res.cookie('refreshToken', refreshToken, 
    {
      httpOnly: true, 
      maxAge: 24*60*60*1000
    })

    // res.cookie('token',token, {httpOnly: true, maxAge: 60*60*1000})

    res.json({user: newAccount._id, access_token: token})
  }catch(err){
    res.json({"message":err.message})
  }
}

export const Logout = async (req,res)=>{
  if(!req.cookies.refreshToken) return res.sendStatus(204);
  console.log('logout')
  await AccountSchema.findOneAndUpdate({refreshToken: req.cookies.refreshToken},{refreshToken:null})

  res.cookie('refreshToken', '', {maxAge: 1})
  res.json({message: 'logout success'})
}