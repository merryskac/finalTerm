import { requireAuth, verifyToken } from '../authMiddleware/authMiddlewae.js'
import { addAProduct, getAllProducts, getAllProductsById } from '../controllers/product.controller.js'
import channelRouters from './channel.js'

channelRouters.get('/products',  getAllProducts)
// channelRouters.get('/products', getAllProducts)

channelRouters.post('/products/:id',verifyToken,  addAProduct)

channelRouters.get('/products/:id',verifyToken ,getAllProductsById)
export default channelRouters