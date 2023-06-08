var express = require('express');
var router = express.Router();
var prod = require("../models/productSchema");
var checkAuth = require("../middlewares/checkAuth");

 /* PRODUCT PAGE. */
 router.get('/Products', async function(req, res, next) {
  let product = await prod.find();
  console.log(req.session.user);
  res.render('Products/product', { title: 'Products' , product});
 });

 // PRODUCT ADD PAGE
 router.get('/ProductAdd', checkAuth, function(req, res, next) {
  res.render('Products/product-add', { title: 'Add Product'});
 });
 router.post('/ProductAdd', async function(req, res, next) {
   let product = new prod(req.body);
   await product.save();
   res.redirect("/Products");
 });
 
 
 // Deleting Products
 router.get('/delete/:id', async function(req, res, next) {
   let product = await prod.findByIdAndDelete(req.params.id);
   res.redirect("/Products");
 });

 //  Edit page
 router.get("/edit/:id", async function (req, res, next) {
   let product = await prod.findById(req.params.id);
   res.render("Products/product-edit", {title: 'Editing Product', product});
 });
 
 router.post("/edit/:id", async function (req, res, next) {
   let product = await prod.findById(req.params.id);
   product.Name = req.body.Name;
   product.Company = req.body.Company;
   product.Category = req.body.Category;
   product.Price = req.body.Price;
   product.Quantity = req.body.Quantity;
   product.Img = req.body.Img;
   await product.save();
   res.redirect("/Products");
 });

  //  Handling Cookies
  router.get("/cart/:id", async function (req, res, next) {
    let product = await prod.findById(req.params.id);
    let cart = [];
    if(req.cookies.cart) {cart = req.cookies.cart;}

    cart.push(product);
    res.cookie("cart", cart);
    res.redirect("/Products");
  });

  router.get("/removecart/:id", async function (req, res, next) {
    let cart = [];
    if (req.cookies.cart) {
      cart = req.cookies.cart;
    }
    cart.splice(
      cart.findIndex((c) => {
        return c._id == req.params.id;
      }),
      1
    );
    res.cookie("cart", cart);
    res.redirect("/cart");
  });



module.exports = router;
