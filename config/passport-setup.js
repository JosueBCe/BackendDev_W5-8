const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model-db');


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
    try {
      // check if user already exists in our own db
      const currentUser = await User.findOne({ googleId: profile.id });
      if (currentUser) {
        // already have this user
        console.log('user is: ', currentUser);
        done(null, currentUser);
      } else {
        // if not, create user in our db
        const newUser = await new User({
          username: profile.id,
          googleId: profile.displayName,
          thumbnail: profile._json.image.url
        }).save();
        console.log('created new user: ', newUser);
        done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  })
);
/* 
https://github.com/bradtraversy/storybooks/blob/master/config/passport.js
https://www.youtube.com/watch?v=BZwzWgLA0JA&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=13
https://github.com/iamshaunjp/oauth-playlist/blob/lesson-21/app.js
https://www.youtube.com/watch?v=SBvmnHTQIPY


https://www.google.com/search?q=Operation+%60users.findOne()%60+buffering+timed+out+after+10000ms&rlz=1C1UUXU_esAR946AR946&oq=Operation+%60users.findOne()%60+buffering+timed+out+after+10000ms&aqs=chrome..69i57.517j0j7&sourceid=chrome&ie=UTF-8






















*/