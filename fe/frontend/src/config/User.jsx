import { checkPropTypes } from "prop-types";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./Authentication";
import { cekToken } from "./authAPI";

export const UserContext = createContext()

const User = ({children}) => {
  const [isLogged, setIsLogged] = useContext(AuthContext)
  const [user, setUser] = useState()
  
  useEffect(()=>{
    isLogged && cekToken().then(data=>{
      if(data.accessToken){
        setUser(data.username)
        if(data.accessToken !== localStorage.getItem('access_token')){
          localStorage.setItem('access_token', data.accessToken)
        }
      setIsLogged(true)
      }else{
        
        window.localStorage.clear()
        setIsLogged(false)
      }
    }).catch(err=>{
      console.log(err.message)
    })
  },[])
  
  return ( 
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
   );
}

User.propTypes = {
  children: checkPropTypes.any
}
 
export default User;