import { verifyToken } from "../authMiddleware/authMiddlewae.js";
import { addAComment, getCommentById } from "../controllers/comment.controller.js";
import { addComment, getComment } from "../use case/comment.js";
import channelRouters from "./channel.js";

channelRouters.get('/comments/:id', getCommentById)

channelRouters.post('/comments/:id', addAComment)

export default channelRouters