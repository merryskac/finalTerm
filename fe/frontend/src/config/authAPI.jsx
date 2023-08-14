export const cekToken = () =>{
  try{
  const cek = fetch('https://final-term-c1di2e8vg-merryskac.vercel.app/play/cektoken',{
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