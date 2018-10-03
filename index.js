require ('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategy');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);


//generates user object for us to use
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/login', passport.authenticate('auth0', {
  successRedirect: '/me',
  failureRedirect: '/login'
}));

app.get('/me', (req, res) => {
  if(!req.user) {
    res.sendStatus(401);
  } else {
    res.send(200).send(req.user);
  }
});

const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );