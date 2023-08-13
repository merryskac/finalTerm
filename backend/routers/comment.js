import { verifyToken } from "../authMiddleware/authMiddlewae.js";
import { addAComment, getCommentById } from "../controllers/comment.controller.js";
import { addComment, getComment } from "../use case/comment.js";
import channelRouters from "./channel.js";

channelRouters.get('/comments/:id',verifyToken,  getCommentById)

channelRouters.post('/comments/:id',verifyToken,  addAComment)

export default channelRouters