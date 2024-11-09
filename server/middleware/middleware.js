import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const middleware = async (req, res, next) => {
  try {
    // Check if authorization header is present and correctly formatted
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Authorization header missing or malformed" });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, "screkeyofnoteapp@123!#");
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    // Find user by decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach user info to the request object
    req.user = { name: user.name, id: user._id };
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({ success: false, message: "Server error. Please try logging in again." });
  }
};

export default middleware;
