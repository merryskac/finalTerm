import { getVideos, uploadVideo } from "../use case/channel.js"

export const channelGet = async (req,res)=>{
  try{
    const getAllVideos = await getVideos()

    return(res.status(200).json({"thumbnails":getAllVideos}))
  }
  catch(err){
    return (res.status(404).json({message:err}))
  }
}

export const channelPost = async(req,res)=>{
  const {title, thumbnail_img} = req.body
  try{
    const upload = await uploadVideo(title, thumbnail_img)
    return (res.status(201).json({"video": upload}))
  }
  catch(err){
    return (res.status(400).json({message: err.message}))
  }
}