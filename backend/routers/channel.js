import express from 'express'
import { getVideos, uploadVideo } from '../use case/channel.js'
const channelRouters = express.Router()
import {channelGet, channelPost} from '../controllers/channel.controller.js' 
import { verifyToken } from '../authMiddleware/authMiddlewae.js'

// channelRouters.use(verifyToken)
channelRouters.get('/thumbnails', verifyToken,  channelGet)
channelRouters.post('/post-video',verifyToken, channelPost)


export default channelRouters 