var dbConn = require('../config/db.config');

var OTP = function (otp) {
	this.id = otp.id;
    this.otp = otp.otp;
    this.token= otp.token;
    this.user_id = otp.user_id;
    this.otp_type = otp.otp_type;
	this.created_at = new Date();
	
}



// Get all data of OTP
OTP.getAllOtps = () => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT * FROM otps', (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}


module.exports=OTP;
