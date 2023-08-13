import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username:{
    required: true,
    type: String,
    lowercase: true
  },
  password:{
    required: true,
    type: String,
    minLength: 6
  },
  refreshToken:{
    type: String
  }
})

export const AccountSchema = mongoose.model('Account', accountSchema)

export const findUsername = async(username) => {
  return await AccountSchema.findOne({username: username})
}

export const updateRefreshToken = async(refreshToken, updatedRefreshToken) =>{
  return await AccountSchema.findOneAndUpdate({refreshToken: refreshToken}, {refreshToken: updateRefreshToken})
}

// AccountSchema.statics.login = async function(username, password){
//   const user = await this.findOne({username})
//   if(!user){
//     throw Error('Username doesnt exist')
//   }
  
// }