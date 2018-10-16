const express = require('express'),
app = express(),
passport = require('passport'),
facebookRoutes = require('./Controllers/facebook.routes'),
port = process.env.PORT || 3000;

app.use('/auth/facebook/', facebookRoutes);

app.listen(port, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("Listening in port ", port);
  }
})