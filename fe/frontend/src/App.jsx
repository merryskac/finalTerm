import { ChakraProvider } from '@chakra-ui/react'
import Authentication from './config/Authentication'
import User from './config/User'

import Routers from './router/Routers'

function App() {
  return (
    <ChakraProvider>
      <Authentication>
        <User>
          <Routers/>
        </User>
      </Authentication>
    </ChakraProvider>
  )
}

export default App
