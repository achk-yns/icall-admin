const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const User = require("../Models/User")

module.exports = passportConfig = ()=>{
    passport.use(
    new LocalStrategy({usernameField:"EMAIL",passwordField:"PASSWORD"} , 
    function(username, password, done) {

        console.log(username);
        User.findOne({username}, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        });
      }
    ))

    passport.serializeUser(function(user, done) {

        done(null, {  EMAIL: user.EMAIL });
    });

    
passport.deserializeUser(async (EMAIL, done) => {
    try {
        const user = await User.findOne({ EMAIL });
        return done(null, user);
      } catch (error) {
        return done(error);
    }
  });
}