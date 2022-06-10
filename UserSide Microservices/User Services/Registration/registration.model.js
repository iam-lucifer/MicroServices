var dbConn = require('../config/db.config');
var registerUser = function (users) {
  this.id = users.id;
  this.role_id = users.role_id;
  this.full_name = users.full_name;
  this.email = users.email;
  this.password = users.password;
  this.created_at = new Date;
  this.updated_at = new Date;
}
// console.log(users.full_name)
registerUser.get_user = (data, result) => {
  if (data.full_name === "" || data.email == "" || data.password === "") {
    console.log('error while adding user');

  }
  else {
    const response = dbConn.query(`select * from users where email = ?`, data.email, (err, res) => {
      // console.log("response data of select query",response)
      const  [[resdata]] = response._results;
      console.log('resdata===========',resdata)

      if (resdata === undefined) {
        dbConn.query(`INSERT INTO users SET ? `, data, (err, res) => {
          // console.log("registermodel data", data);
          if (err || data.full_name === "" || data.email == "" || data.password === "") {
            console.log('error while adding user');
            console.log(err);
            result(null, err);
          } else {
            console.log('data added successfully');
            result(null, { status: true, message: 'you have been registered.' });
          }
        })
        
        // console.log(data)

      } else {
        result(null, { status: false, message: 'This EmailId already Exists' });
      }
    });
  }
}
module.exports = registerUser;

