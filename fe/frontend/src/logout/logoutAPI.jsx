export const logout = () =>{
  const out = fetch('http://localhost:3000/play/logout',{
    credentials: 'include'
  }).then(
    data=>data.json()
  ).then(data=>data)

  return out
}