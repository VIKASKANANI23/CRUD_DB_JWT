const alldata = `select * from  users `;
const specificName = `SELECT * FROM users WHERE user_email=$1`;
const dataadd = `INSERT INTO users (user_name, user_email, user_password ,role ) VALUES ($1, $2, $3 , $4) RETURNING *`;
const employeeData = `select * from  employee`;
const empname = `SELECT * FROM employee WHERE emp_name=$1`;
const newEmp = `INSERT INTO employee (emp_id ,emp_name,emp_dept,emp_place) VALUES ($1,$2, $3, $4 )RETURNING *`;

module.exports = {
  alldata,
  specificName,
  dataadd,
  employeeData,
  empname,
  newEmp,
};
