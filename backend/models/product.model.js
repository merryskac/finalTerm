import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  link_product:{
    require: true,
    type: String
  },
  title:{
    require: true,
    type: String
  },
  price:{
    require: true,
    type: Number
  },
  videoID:{
    require: true,
    type: String
  },
  img:{
    type: String
  }
})

const Product = mongoose.model('Product', productSchema)

const countData = getAllProducts().then(data => {
  if(data.length<1){
    const addData = new Product({
      link_product: "https://nodejs.org/en",
      title:"NodeJS installer",
      price:50000,
      videoID: '64c21000258b2c61c16a576e',
    }).save().then(data => console.log("data product added"))
  }
})

export async function getAllProducts(){
  return await Product.find()
}
export async function addProducts(linkProduct,name, price, videoID){
  const addProduct = new Product({
    link_product: linkProduct,
    title: name,
    price: price,
    videoID: videoID
  })
  const add =await addProduct.save()
  return add
}

export async function getAllProductsById(id){
  return Product.find({videoID: id})
}