const Router = require('express').Router();
const passport = require('passport');

require('./facebook.setup');
Router.get('/', passport.authenticate('facebook', {
  scope: ['public_profile']
}));

Router.get('/redirect', passport.authenticate('facebook'), (req, res) => {
  // res.redirect('/homepage/' + req.user.id );
  res.redirect('/homepage')
})

module.exports = Router;