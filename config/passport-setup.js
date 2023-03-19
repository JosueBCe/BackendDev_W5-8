const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model-db');
const mongodb = require('../models/connectdb'); // requires functions from db/connect
const ObjectId = require('mongodb').ObjectId;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    try {
      console.log(profile);

//       const userCount = await User.countDocuments({ googleId: profile.id });
// if (userCount > 0) {
//   console.log('User already exists in the database');
//   done(null, profile);
//   return;
// }

      // Creating a new user object from the Google profile
      const user = {
        admin: false,
        name: profile.displayName,
        lastname: profile._json.family_name,
        email: profile._json.family_name+"@"+"gmail.com",
        picture: profile._json.picture,
        language: profile._json.en,
        googleId: profile.id
      };

      // Inserting the new user into the database
      const response = await mongodb
        .getDb()
        .db('ecommerce')
        .collection('users')
        .insertOne(user);

      if (response.acknowledged) {
        console.log('New user added to the database');
      } else {
        console.error(response.error || 'Some error occurred while creating the User');
      }

      // Calling the done function to complete the authentication process
      done(null, profile);

    } catch (err) {
      console.error(err);
      done(err, null);
    }
  })
);

    // try {
    //   // check if user already exists in our own db
    //   const currentUser = await User.findOne({ googleId: profile.id });
    //   if (currentUser) {
    //     // already have this user
    //     console.log('user is: ', currentUser);
    //     done(null, currentUser);
    //   } else {
    //     // if not, create user in our db
    //     const newUser = await new User({
    //       username: profile.id,
    //       googleId: profile.displayName,
    //       thumbnail: profile._json.picture
    //     }).save();
    //     console.log('created new user: ', newUser);
    //     done(null, newUser);
    //   }
    // } catch (err) {
    //   console.error(err);
    //   done(err, null);
    // }

/* 
https://github.com/bradtraversy/storybooks/blob/master/config/passport.js
https://www.youtube.com/watch?v=BZwzWgLA0JA&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=13
https://github.com/iamshaunjp/oauth-playlist/blob/lesson-21/app.js
https://www.youtube.com/watch?v=SBvmnHTQIPY


https://www.google.com/search?q=Operation+%60users.findOne()%60+buffering+timed+out+after+10000ms&rlz=1C1UUXU_esAR946AR946&oq=Operation+%60users.findOne()%60+buffering+timed+out+after+10000ms&aqs=chrome..69i57.517j0j7&sourceid=chrome&ie=UTF-8






















*/