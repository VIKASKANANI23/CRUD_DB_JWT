module.exports = (req, res, next) => {
  const { email, name, pass } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    console.log(`!email.length - ${!email.length}`);
    if (![email, name, pass].every(Boolean)) {
      return res.json('Missing register Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid register Email');
    }
  } else if (req.path === '/login') {
    if (![email, pass].every(Boolean)) {
      return res.json('Missing login  Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid login Email');
    }
  }

  next();
};
