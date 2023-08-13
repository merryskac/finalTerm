import { getVideoById } from "../models/channel.model.js";
import { getAllProducts, addProducts, getAllProductsById } from "../models/product.model.js";

export async function getProducts(){
  return getAllProducts()
}

export async function addProduct(linkProduct, name, price, videoID){
  try{
    const findId = await getVideoById(videoID)
    if(!findId){
      throw Error('Video content not found')
    }
  }catch(err){
      throw Error(err.message)
  }

  if(linkProduct === undefined || name === undefined || price === undefined || videoID===undefined){
    throw Error("Data link_product, name, price are required!");
  }
  if(typeof price != 'number'){
    throw Error("price should be number")
  }
  
  return addProducts(linkProduct, name, price, videoID)
}

export async function getProductsById(id){
  try{
    const findId = await getVideoById(id)
    if(!findId){
      throw Error('Video content not found')
    }
  }catch(err){
    throw Error(err.message)
  }
  const productsByID = await  getAllProductsById(id)
  const productsArray = new Array()
  const products = productsByID.map(product =>{
    const productData ={
      ProductID: product._id,
      link_product: product.link_product,
      title: product.title,
      price: product.price,
      img: product.img
    }
    return productData
  })
  // if(products.length < 1){
  //   throw Error('Data not found')
  // }
  console.log(products)
  return products
}