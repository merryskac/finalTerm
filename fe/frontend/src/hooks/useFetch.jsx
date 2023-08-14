import { useEffect } from "react"
import { useState } from "react"

export const useFetch = (url)=>{
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(()=>{
    const abortCont = new AbortController();
    fetch(url, {
      headers:{
        Authorization:'Bearer '+localStorage.getItem('access_token')
      }
    })
      .then(res=>{
        if(!res.ok){
          throw Error("Cannot fetch data for that resource")
        }
        return res.json()
      })
      .then(data=>{
        setResponse(data)
        setPending(false)
        setError(null)
      }).catch(err=>{
        if(err.name === 'AbortError'){
          console.log('fetch aborted')
        }else{
          setPending(false)
          setError(err.message)
        }
      })
      return () =>{
        abortCont.abort()
      }
  }, [])
  
  return {response, pending, error}
}