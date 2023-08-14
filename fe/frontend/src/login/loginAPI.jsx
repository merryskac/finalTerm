export const login = (username, pass)=>{
  const log = fetch('https://final-term-8c769ilvz-merryskac.vercel.app/play/login',{
    credentials:'include',
    mode:'cors',
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      username: username,
      password: pass
    })
  }).then(
    data=>data.json()
  ).then(
    data=>data
  )
  return log
}

export const register = (username, pass)=>{
  const log = fetch('https://final-term-8c769ilvz-merryskac.vercel.app/play/register',{
    credentials:'include',
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      username: username,
      password: pass
    })
  }).then(
    data=>data.json()
  ).then(
    data=>data
  )
  return log
}