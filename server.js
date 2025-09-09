import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
// Import passport config
import "./config/passport.js";

// Import routes 
import userRoutes from "./routes/userRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";

;

const app = express();

app.use(express.json());
app.use(session({ secret: "temp_secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
});

