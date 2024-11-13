import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secretKey = process.env.SECRET_KEY;

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header is missing." });
    }

    // Extract and validate token format
    const token = authHeader.split(" ")[1];
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ success: false, message: "Invalid or missing token." });
    }

    // Verify the secret key
    if (!secretKey) {
      return res.status(500).json({ success: false, message: "Server configuration error." });
    }

    // Decode and verify token
    const decoded = jwt.verify(token, secretKey);

    // Fetch the user based on the decoded token id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Attach user ID to the request object
    req.user = { id: user._id, name: user.name };
    next();
  } catch (error) {
    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token." });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token has expired." });
    } else {
      console.error("Middleware error:", error);
      return res.status(500).json({ success: false, message: "An error occurred in middleware." });
    }
  }
};

export default middleware;
