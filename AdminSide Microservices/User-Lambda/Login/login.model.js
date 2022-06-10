var dbConn = require('../config/db.config');
var user = function (user) {
    this.id = user.id;
    this.full_name = user.full_name;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date;
    this.updated_at = new Date;
}

user.get_login = (data, result) => {
    console.log("login model data", data);
    const no = dbConn.query(`SELECT * from users where email = ? `, data, (err, res) => {
        [[no_resultss]] = no._results
        if ((no_resultss === undefined)) {

            result(null, err);
        } else {
            console.log('data added successfully', res);
            result(null, res);
        }
    })
}

module.exports = user;