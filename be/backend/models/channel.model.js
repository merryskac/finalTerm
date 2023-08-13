import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  title:{
    type: String, 
    require: true
  },
  thumbnail_img:{
    type: String,
    require: true
  },
  url:{
    type: String,
    require: true
  },
  created_at:{
    type: Date,
    default: Date.now
  },
  ended_at: {
    type: Date,
    default: null
  }
})

const Channel = mongoose.model('Channel', channelSchema)

getAllVideos().then(data => {
  if(data.length<1){
    const addData = new Channel({
      _id: "64c21000258b2c61c16a576e",
      title: "Selamat lebaran",
      thumbnail_img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    }).save().then(data => console.log("Data channel inputted"))
  }
})

export async function getAllVideos(){
  return await Channel.find()
}

export async function inputVideo(title,img){
  const app = new Channel({
    title: title,
    thumbnail_img: img
  })
  await app.save()
  return app
}

export async function getVideoById(id){
  return await Channel.findById(id)
}