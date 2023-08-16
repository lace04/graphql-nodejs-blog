import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || '';

  try {
    const verified = jwt.verify(token, 'supersecretpassword');
    req.verifiedUser = verified.user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      error: 'Invalid token',
    });
    //next();
  }
};
