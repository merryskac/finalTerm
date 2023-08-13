import { useState } from "react"

export const usePost = ()=>{

  const [err, setErr] = useState(null)
  const postData = (url, dataBody, action)=>{
    
      fetch(url ,{
        method:'POST',
        headers:{
          Authorization: 'Bearer '+localStorage.getItem('access_token'),
          'Content-type':'application/json'
        },
        body: JSON.stringify(dataBody)
      })
      .then(data=>{
        let res = data.json()   
        action(res)
      })
      
      .catch(err=>{
        setErr(err.message)
      })
   
  }

  return [err, postData]
}
