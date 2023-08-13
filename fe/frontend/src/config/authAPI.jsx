export const cekToken = () =>{
  try{
  const cek = fetch('http://localhost:3000/play/cektoken',{
    credentials:'include',
    headers:{
      authorization: "Bearer "+localStorage.getItem('access_token')
    }
  }).then(data=>data.json())
  .then(data=>data)
  return cek
}catch(err){
  console.log(err)
}
}