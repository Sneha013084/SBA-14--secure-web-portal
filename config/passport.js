

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js"; // make sure User.js has `export default User`

// DEBUG: check env variables
//console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
// to set up the github OAuth strategy 
//you create a GitHub OAuth app at GitHub Developer Setting.

//Copy Client ID and Client Secret into .env.

passport.use(
  new GitHubStrategy(
    {
       clientID: process.env.GITHUB_CLIENT_ID,
       clientSecret: process.env.GITHUB_CLIENT_SECRET,
       callbackURL: "http://localhost:5000/api/users/auth/github/callback",
       scope: ["user:email"],
  
    },
      
    // This is the "verify" callback
    async (accessToken, refreshToken, profile, done) => {
      try {
        // The "profile" object contains the user's GitHub information
        const existingUser = await User.findOne({ githubId: profile.id });
 
        if (existingUser) {
          // If user already exists, pass them to the next middleware
          return done(null, existingUser);
        }
 
        // If it's a new user, create a record in our database
        const newUser = new User({
          githubId: profile.id,
          username: profile.username,
          email: profile.emails[0].value, // Some providers return an array of emails
        });
 
        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  ));

 
// These functions are needed for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});
 
passport.deserializeUser( async(id, done) => {
  try{
    const user = await User.findById(id);
    done(null, user);
} catch (err){
  done(err);
}

});
export default passport;