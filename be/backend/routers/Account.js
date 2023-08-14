import { checkToken } from "../authMiddleware/authMiddlewae.js";
import { Login, Logout, Register } from "../controllers/account.controller.js";
import { refreshToken } from "../controllers/refreshToken.js";
import channelRouters from "./channel.js";

channelRouters.post('/login', Login)
channelRouters.post('/register', Register)
channelRouters.get('/logout', Logout)
channelRouters.get('/token', refreshToken)
channelRouters.post('/cektoken', checkToken)

export default channelRouters