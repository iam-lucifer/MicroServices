const OTPModel = require('./otp.model');



// To get all data of otp
exports.getOTPList = async (req, res) => {
  try {
    const tickets = await OTPModel.getAllOtps();
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
    console.log(error);
  }
};



