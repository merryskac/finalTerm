import { createContext } from "react"
import { useState } from "react"



export const AuthContext = createContext()

const Authentication = ({children}) => {
  const [isLogged, setIsLogged] = useState(()=>{
    if(localStorage.getItem('access_token')){
      return true
    }
    return false
  })

  return ( 
      <AuthContext.Provider value={[isLogged, setIsLogged]}>
        {children}
      </AuthContext.Provider>
   );
}
 
Authentication.propTypes = {
  children: null
}
export default Authentication;