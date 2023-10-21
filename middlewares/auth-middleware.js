


import jwt from 'jsonwebtoken';
import { config } from '../config/connect.js'
// Middleware to authenticate the user
// const authMiddleware =  async(req, res, next) => {
//   const token =  req.header('Authorization'); // Assuming the token is passed in the 'Authorization' header
//   if (!token) {
//     return res.status(401).json({ msg: 'Authorization denied' });
//   }
//   console.log(token);

//   try {
//     const decoded =jwt.verify(token, config.app.jwtSecret);
//     console.log(config.app.jwtSecret,"+++++");
//     console.log(decoded,"------");
//     req.user = decoded.user; // Set the user object on the request
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

const  authMiddleware = async (req, res, next)  =>{
    const header_auth = req.headers.authorization;
    const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
  
    try {
        req.errorStatus = 401;
        const decoded = jwt.verify(token, config.app.jwtSecret);
        console.log(decoded,"+++++");
        // Assuming decoded contains user data with 'email' property.
        req.user = decoded.user;
  
        next();
    } catch (e) {
      next(e);
      res.status(401).json({ msg: 'Token is not valid' });

    }
  }

export default authMiddleware