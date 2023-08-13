import { getComment, addComment } from "../use case/comment.js";

export const getCommentById = async (req,res)=>{
  const {id} = req.params
  try{
    const comments = await getComment(id);
    return (res.status(200).json({comments}))
  }catch(err){
    console.log(err.message)
    res.status(404).json({message: err.message})
  }
}

export const addAComment = async (req,res)=>{
  const {id} = req.params
  const {username, comment} = req.body
  try{
    const add_comment = await addComment(username, comment, id)
    return (res.status(200).json({message: "Comment successfully added"}))
  }
  catch(err){
    return (res.status(404).json({message:err.message}))
  }
}