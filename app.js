const express = require('express'),
app = express(),
passport = require('passport'),
session = require('express-session'),
facebookRoutes = require('./Controllers/facebook.routes'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
key = require('./key'),
localUserRoutes = require('./Controllers/localuser.routes');
port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({ secret: key.secret }))
app.use(passport.initialize());
app.use(passport.session());

require('./Controllers/facebook.setup');
mongoose.connect('mongodb://localhost/advacedproject4');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/index.html');
})

app.use('/auth/facebook/', facebookRoutes);
app.use('/auth/localuser/', localUserRoutes);

app.get('/homepage', (req, res) => {
  if(req.user) {
    res.send(req.user);
  } else if (req.session.localUser){
    res.send(req.session.localUser);
  } else {
    res.redirect('/homepage');
  }
})

app.listen(port, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("Listening in port ", port);
  }
})