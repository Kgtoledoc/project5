const Router = require('express').Router();
const User = require('../Model/user.model');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

Router.post('/new', (req, res) => {
  let newuser = new User;
  newuser.username= req.body.username;
  newuser.password= bcrypt.hashSync(req.body.password, salt);
  newuser.save((err, newuser) => {
    if(newuser){
      req.session.localUser = newuser;
      res.redirect('/homepage');
    }
  })
})
Router.post('/login', (req, res) => {
  User.find({
    username: req.body.username,
    //password: req.body.password,
  }, (err, theuser) => {
    if(bcrypt.compareSync(req.body.password, theuser[0].password)){
      req.session.localUser = theuser;
      res.redirect('/homepage');
    } else {
      res.redirect('/');
    }
      //req.session.localUser = theuser;
      //res.redirect('/homepage');
  })
})

module.exports = Router;