
import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // token valid for 1 hour
  });
};

export const authMiddleware = (req,res,next) =>{

    const token = req.headers.authorization?.split(" ") [1];

    if (!token) return res.status(401).json ({ message : "Unauthorized"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


