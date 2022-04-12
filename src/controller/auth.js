const pool = require('../DB/connection');
const queries = require('../DB/queries');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../tokenverify/jwtgenerator');
//------------------------------alldata-user-wholedata---------------------------------//

const getdata = async (req, res) => {
  console.log('ss');
  try {
    const a = await pool.query(queries.alldata);
    res.status(200).json(a.rows);
  } catch (error) {
    res.status(400).send('invalid data');
    console.log(error);
  }
};

//--------------------------------specific username---------------------------------//

const getspecificdata = async (req, res) => {
  try {
    const user_name = req.params.user_name;
    const a = await pool.query(queries.specificName, [user_name]);
    res.status(200).json(a.rows);
  } catch (error) {
    res.status(500).send('server error');
  }
};

//------------------------------------register router-------------------------------------------//
const userregister = async (req, res) => {
  try {
    //destructure the  req.body (name ,email,pass)
    const { name, email, pass, role } = req.body;
    console.log(req.body);
    //check if users exits
    const user = await pool.query(queries.specificName, [email]);
    console.log(`user-${user.rows}`);

    // console.log(`user.rows- ${user.rows}`);
    if (user.rows.length !== 0) {
      console.log(`user.rows.length - ${user.rows.length}`);

      return res.status(401).json('User already exist! so  login in ');
    }
    //bcrypt  the user password
    const salt = await bcrypt.genSalt(16);
    const bcryptPassword = await bcrypt.hash(pass, salt);
    console.log('register 5');

    const newUser = await pool.query(queries.dataadd, [
      name,
      email,
      bcryptPassword,
      role,
    ]);

    console.log(`newUser - ${newUser.rows.name}`);
    //res.json(newUser.rows[0]);
    const jwtToken = jwtGenerator(newUser.rows.user_email);
    console.log(`jwtToke - ${jwtToken}`);
    return res.status(200).send(`you are register as   ${req.body.role}`);
    return res.json({ jwtToken });
    //generating our jwt token
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};
//-----------------------------------login router-----------------------------------------//
const userlogin = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await pool.query(queries.specificName, [email]);

    if (user.rows.length === 0) {
      console.log(user.rows.length);
      return res.status(401).json("'email is incorrect '");
    }

    const validPassword = await bcrypt.compare(
      pass,
      user.rows[0].user_password
    );
    console.log(`validpassword - ${validPassword}`);
    if (!validPassword) {
      return res.status(401).json('password is incorrect');
    }

    const jwtToken = jwtGenerator(user.rows[0].user_email);

    // return res.status(200).json(user.rows[0]);

    return res.json({ 'token generator': jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//----------------------------------list router----------------------------//
const confilctalldata = async (req, res) => {
  console.log('hi vikuuuuu');
  console.log('reached herer....');
  try {
    const a = await pool.query(queries.employeeData);
    res.status(200).json(a.rows);
  } catch (error) {
    res.status(500).send('server error');
  }
};
//-------------------------------add--------------------//
const add = async (req, res) => {
  try {
    const { emp_id, emp_name, emp_dept, emp_place } = req.body;
    console.log(req.body.emp_name);
    //check if users exits
    const user = await pool.query(queries.empname, [emp_name]);

    console.log(user.rows.length);

    if (user.rows.length) {
      return res.status(401).json('employee already exist! so  login in ');
    }
    //bcrypt  the user password

    const newUser = await pool.query(queries.newEmp, [
      emp_id,
      emp_name,
      emp_dept,
      emp_place,
    ]);
    console.log(`newUser - ${newUser.rows[0]}`);
    return res.json('you are empolyee');

    return res.json(newUser.rows);
    //return res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server add error');
  }
};

module.exports = {
  getdata,
  getspecificdata,
  userregister,
  userlogin,
  confilctalldata,
  add,
};
