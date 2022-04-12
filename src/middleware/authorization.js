const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  console.log(req);
  // Get token from header
  const token = req.header('jwt_token');
  console.log(`authorize toke - ${token}`);
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: 'authorization denied' });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})

    const verify = jwt.verify(token, process.env.jwtSecret);

    console.log(`verify jwt - ${verify}`);

    req.user = verify.user;
    // if (req.user.role == 'admin') {
    //   next();
    // } else {
    //   res.status(404).send('you are  usrers ');
    // }

    console.log(`req.user=verify.user ${(req.user = verify.user)}`);

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
