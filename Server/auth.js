require('dotenv').config()
const jwt = require('jsonwebtoken');

export const verifyToken = async (req, res, next) => {
    try {
      let token = req.header("access-token");
      
      if (!token) {
        return res.status(403).send("Access Denied");
      }
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };