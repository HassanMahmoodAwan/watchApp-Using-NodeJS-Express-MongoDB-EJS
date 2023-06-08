var express = require('express');
var router = express.Router();
var User = require("../models/userSchema");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Watches' });
});

router.get('/contactUs', function(req, res, next) {
  res.render('contactUs', { title: 'Contact Us' });
});


// Cart
router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) { cart = []; }
  res.render("cart", { title: "Cart", cart})
});



// User Routes  (Register)
router.get("/Register", function (req, res, next) {
  res.render("Users/register", { title: "Register" });
});

router.post("/Register", async function (req, res, next) {
  let user = new User(req.body);
  await user.save();
  res.redirect("/");
});

// User Routes  (Login)
router.get("/Login", function (req, res, next) {
  res.render("Users/login", { title: "login" });
});
router.get("/Logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/Login");
});



router.post("/Login", async function (req, res, next) {
  let user = await User.findOne({email: req.body.email, password: req.body.password})
  if(!user) {return res.redirect("/Register")}
  else{
    req.session.user = user;
    return res.redirect("/Products");
  }
});


module.exports = router;
