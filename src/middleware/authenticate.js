
import jwt from "jsonwebtoken";


export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header',authHeader)

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    jwt.verify(token, 'thisismyjsonwebtokensecretkeyforcookie', (err, user) => {
      if (err) {
        return res.status(401).json({error:'token verification failed',status:401});
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({error:'token verification failed',status:401});
  }
}