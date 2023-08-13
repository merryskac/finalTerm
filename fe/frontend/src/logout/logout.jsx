import { useEffect } from "react"
import { logout } from "./logoutAPI"

const Logout = () => {
  
  useEffect(()=>{
    try{
      logout().then(data=>{
        if(data.message == "logout success"){
          window.localStorage.clear()
          window.location.href = '/'
        }
      })
    }catch(err){
      console.log(err.message)
    }
    
  },[])
  localStorage.clear()
  return ( <div>
  ...logout
  </div> );
}
 
export default Logout;