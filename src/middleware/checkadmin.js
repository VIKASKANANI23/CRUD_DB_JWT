const pool = require('../DB/connection');
const isadmin = (permission) => {
  return async (req, res, next) => {
    const email = req.body.email;
    try {
      const nrole = await pool.query(
        `select role from users where user_email=$1 `,
        [email]
      );

      console.log(`nrole.rows[0]- ${nrole.rows[0]}`);
      console.log(`nrole.rows[0].role- ${nrole.rows[0].role} `);

      if (nrole.rows[0].role == permission) {
        const sAdmin = await pool.query('select * from employee');
        res.status(200).send(sAdmin.rows);
        next();
      } else {
        res
          .status(200)
          .json('you are not admin that is why we could not show data');
      }
    } catch (error) {
      res.status(404).send('does not exist log in  ,  so please register');
    }
  };
};
module.exports = isadmin;

// const vikas = (permission) => {
//   return (req, res, next) => {
//     const role = req.body.role;
//     if (!(permission == role)) {
//       next();
//     } else {
//       return res
//         .status(401)
//         .json('you are not admin that is why we could not show data');
//     }
//   };
// };
// module.exports = vikas;
