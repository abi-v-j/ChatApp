import jwt from 'jsonwebtoken'
import "../env.js";



const Auth = (req, res, next) => {
  const token = req.header('Authorization'); // Assuming the token is in the header

  if (!token) {
    return res.json({ message: 'No token, authorization denied',check:false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now() / 1000) {
      return res.json({ message: 'Token has expired',check:false  });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    res.json({ message: 'Invalid token',check:false  });
  }
}

export default Auth;
