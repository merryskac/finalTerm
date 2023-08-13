import { getVideoById } from "../models/channel.model.js";
import { addComments, commentList } from "../models/comments.model.js";

export async function getComment(id){
  try{
    const findId = await getVideoById(id)
    if(!findId){
      throw Error('Video content not found')
    }
  }catch(err){
      throw Error(err.message)
  }

  const getCommentList = await commentList(id)
  // console.log(getCommentList)
  const comments = getCommentList.map(comment => {
    const list = {
      username: comment.username,
      comment : comment.comment,
      timestamp : comment.timestamp
    }
    return list
  })
  // if(comments.length <1){
  //   throw Error('comment not found')
  // }
  return comments
  
}

export async function addComment(username, comment, id){
  if(username===undefined||comment === undefined){
    throw Error('username and comment are required')
  }
  try{
    const findId = await getVideoById(id)
    if(!findId){
      throw Error('Video content not found')
    }
  }catch(err){
    throw Error(err.message)
  }
  const addCommentModel = await addComments(username, comment, id)
  return addCommentModel
}