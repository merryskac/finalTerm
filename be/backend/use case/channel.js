import { getAllVideos, inputVideo } from "../models/channel.model.js";

export async function getVideos(){
  try{
    const getVideosModel = await getAllVideos()
    const videoArray = new Array()
    const videoData = getVideosModel.forEach(video =>
      {
        const videoData = {
          videoID: String(video._id),
          thumbnail_url: String(video.thumbnail_img)
        }
        return videoArray.push(videoData)
      }
    )
    return getVideosModel
  }
  catch(err){
    return err.message
  }
}

export async function uploadVideo(title, thumbnail_img){
  if(title === undefined || thumbnail_img === undefined){
    throw Error("title and thumbnail_img are required");
    return
  }
    const videoModel = await inputVideo(String(title), String(thumbnail_img))
    return videoModel
}

export async function getVideoById(id){
  try{
    const findId = await getVideoById(id)
    if(!findId){
      throw Error('id not found')
    }
    return findId
  }catch(err){
    throw Error(err.message)
  }
}