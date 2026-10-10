const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const PORT = 5000;

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/products")
  .then(() => {
    console.log("Успешное подключение к БД");
  })
  .catch((error) => {
    console.log("Ошибка при подключении к БД: " + error);
  });

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products);
  } catch (error) {
    console.log("Ошибка при получении продуктов: " + error);
  }
});

app.post("/addproduct", async (req, res) => {
  const { title, description, price } = req.body;
  const newProduct = await Product.create({
    title,
    description,
    price,
  });

  await newProduct.save();
  res.send("Продукт успешно добавлен!");
});

app.patch("/product/:id" , async (req,res)=>{
  try{
    const {id} = req.params
    const {title , description , price} = req.body

    const updateProduct = await Product.findByIdAndUpdate(id , {title , description , price})
    if (!updateProduct) {
      res.send("Такой товар не найден")
    }
    res.send("Продукт успешно обновлен")

  }catch(err){
    console.log("Ошибка при обновлении продукта: " , err.message);
    
  }
})

app.put("product/:id" , async (req , res)=>{
  try {
    const {id} = req.params
    const {title , description , price} = req.body

    const updateProduct = await Product.findByIdAndUpdate(id , {title , description , price})
    if (!updateProduct) {
      res.send("Такой товар не найден")
    }
    res.send("Продукт успешно обновлен")
  } catch (err) {
    console.log("Ошибка при обновлении продукта: " , err.message);
  }
})

app.delete("/deleteproduct/:id" , async (req , res)=>{
    try{
        const {id} = req.params
        
        const product = await Product.findByIdAndDelete(id)
        res.send("Продукт успешно удален!")
    }catch(error){
        console.log("Ошибка при удалении продукта: " + error);
        
    }
})

app.listen(PORT, () => {
  console.log("Сервер успешно запущен на порту: " + PORT);
});
