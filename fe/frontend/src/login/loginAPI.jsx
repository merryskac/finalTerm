export const login = (username, pass)=>{
  const log = fetch('https://final-term-c1di2e8vg-merryskac.vercel.app/play/login',{
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

export const register = (username, pass)=>{
  const log = fetch('https://final-term-c1di2e8vg-merryskac.vercel.app/play/register',{
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