// to handle the HTTP request, to rtepresent the mongoose model
//jwt - for authentication
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { generateToken } from "../utils/auth.js";
//import bcrypt from "bcrypt";

//to handle the /api/user route- create a modular routes

const router = express.Router();



// to register= /api/user/register

router.post("/register", async (req, res) => {
  // to get the data from the request body, in json
  try {
    const { username, password, email } = req.body;

    //to validate the input and sent 400- bad request if anything missing

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All the fields are required" });

    }


    //to check with an existing user with the same email

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: " User already exists" });
    }



    // to create a new user

    const newUser = new User({ username, password, email });
    await newUser.save(); //save to MongoDB

    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });


    //error handling= internal server error
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




//login route

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;


    //input validation

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }


    //find user by email

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect  email or password" });
    }


    // check passsword

    const isMatch = await user.isCorrectPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }


    // create a jwt to allow the client to authenticate for the future actions

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET, // signed with a secret
      { expiresIn: "1h" }
    );


    // respond to the client with token and user informations.

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//gitHub OAuth

router.get("/auth/github", passport.authenticate("github", { scope : ["user:email"]}));

router.get(
    "/auth/github/callback",
    
    passport.authenticate("github", { session :false}),

    (req, res) =>{
        const token = jwt.sign({_id: req.user._id, username : req.user.username }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.redirect(`http://localhost:3000?token=${token}`);
    }
)


export default router;
