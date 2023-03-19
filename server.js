const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./models/connectdb');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const app = express();




mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// set view engine
app.set('view engine', 'ejs');



// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
// connectDb()

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}: http://localhost:${port}/`);
  }
});


