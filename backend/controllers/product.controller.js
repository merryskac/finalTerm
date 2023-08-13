import { addProduct, getProducts, getProductsById } from '../use case/product.js'

export const getAllProducts = async (req,res)=>{
  try{
    const products = await getProducts()
    return (res.status(200).json({products}))
  }
  catch(err){
    return (res.status(404).json({message:err}))
  }
}

export const addAProduct = async(req, res)=>{
  const {link_product ,name, price} = req.body
  const {id} = req.params

  try{
    const add = await addProduct(link_product ,name, price, id)
    return (res.status(201).json({product: add}))
  }
  catch(err){
    return (res.status(400).json({message:err.message}))
  }
}

export const getAllProductsById = async (req, res)=>{
  const videoID = req.params.id
  try{
    const getProductById = await getProductsById(videoID)
    return (res.status(200).json({products:getProductById}))
  }
  catch (err){
    return (res.status(404).json({message: err.message}))
  }
}