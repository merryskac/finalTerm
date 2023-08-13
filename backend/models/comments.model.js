import mongoose from "mongoose";

const commentScheme = new mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  comment:{
    type: String,
    require: true
  },
  videoID:{
    type: String,
    require: true
  },
  timestamp:{
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('Comment', commentScheme)
let count = null;
const countData = getAllComments().then(data => {
  if(data.length<1){
    const addData = new Comment({
      username:"akuTampan123",
      comment:"Barangnya bagus ya!",
      videoID: "64c21000258b2c61c16a576e",
    }).save().then(data => console.log("Data comment inserted"))
  }
})

export function commentList(videoID){
  const comments = Comment.find({videoID: videoID})
  return comments
}

export async function addComments(username, comment, videoID){
  const addComment = new Comment({
    username: username,
    comment: comment,
    videoID: videoID
  })
  await addComment.save()
  return true
}

export async function getAllComments(){
  return await Comment.find()
}