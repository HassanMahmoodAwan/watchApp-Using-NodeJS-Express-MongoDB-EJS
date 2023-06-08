function checkAuth(req, res, next) {
  // set variables for every pug file
  if(req.session.user){
  return next();}
  else{
    return res.redirect("/Login");
  }
}

module.exports = checkAuth;
