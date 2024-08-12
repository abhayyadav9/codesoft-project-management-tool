const jwt = require('jsonwebtoken');

// Replace with your secret key
const SECRET_KEY ='abhay';


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer token

  if (token == null) return res.sendStatus(401); // If no token, unauthorized

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err); // Log verification errors
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach user info to request
    next(); // Proceed to the next middleware/handler
  });
};

module.exports = authenticateToken;
