const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_email) {
  const payload = {
    user: {
      email: user_email,
    },
  };

  console.log(`payload - ${payload.user.email}`);

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1 hr' });
}

module.exports = jwtGenerator;
