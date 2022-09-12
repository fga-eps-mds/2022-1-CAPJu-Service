import jwt from "jsonwebtoken";
import User from "../schemas/User.js";

async function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send();
    }
  }

  if (!token) {
    return res.status(401).send();
  }
}

// async function isAdmin(req, res, next) {
//   console.log(req.user);
//   if (req.user.role !== 1) {
//     return res.status(401).send();
//   }
//   next();
// }

export const authRole = (roleArray) => (req, res, next) => {
  function searchRole(value) {
    return value == req.user.role;
  }
  let filtered = roleArray.filter(searchRole);
  if (req.user.role == filtered) {
    return next();
  }
  return res.status(401).json({ sucess: false, message: "Unauthorized" });
};

export { protect };
