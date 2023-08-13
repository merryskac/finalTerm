export const getProducts = (id) =>{
  const get = fetch('http://localhost:3000/play/products/'+id, {
    headers:{
      authorization: 'Bearer '+ localStorage.getItem('access_token')
    }
  })
  .then(data=>data.json())
  .then(data=>data)

  return get

}