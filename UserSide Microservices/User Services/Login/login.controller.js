const dbConn = require('../config/db.config');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const LoginModel = require('./login.model');
const nodemailer = require("nodemailer");
const randtoken = require('rand-token');
const { json } = require('express');
const e = require('express');
// const format = require('date-fns');
const { parseConnectionUrl } = require('nodemailer/lib/shared');


// --------------------------------------------------------------------------------
// to send email
function sendEmail(email, resetToken) {
  var email = email;
  var resetToken = resetToken;

  const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: "gmail",
    auth: {
      user: "commonid4project@gmail.com",
      pass: "Volansys4password "
    }
  })



  var mailOptions = {
    from: 'homeproduct@gmail.com',
    to: email,
    subject: 'Reset Password Token',
    html: '<p>You requested for reset password , Kindly use this token to reset your password=' + resetToken + '</p>'
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error', error);
    } else {
      console.log('Successful');
    }
  });
}


exports.resetPassword = async (req, res, next) => {
  var email = req.body.email;

  dbConn.query('SELECT * FROM users WHERE email ="' + email + '"', function (err, result) {
    if (err) throw err;
    console.log('email', email);
    console.log('result', result[0]);

    // console.log('id', result[0].id)

    try {

      if (result[0].email == email && result[0].role_id === 1) {
        var num = '1234567890';
        var resetToken = '';

        let expirein = {};
        for (let i = 0; i < 4; i++) {
          resetToken = resetToken + num[Math.floor(Math.random() * 10)];
          expirein = new Date().getTime() + 60 * 1000;
          console.log('expiry time', expirein)
          console.log('resetToken', resetToken)
        }

        var token = randtoken.generate(20);
        console.log("generate token", token);
        // var jsonDate = now.toJSON();
        // var date = Date();
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        console.log(date);




        var sent = sendEmail(email, resetToken);
        if (sent != '0') {
          dbConn.query('INSERT INTO otps SET otp="' + resetToken + '" ,user_id="' + result[0].id + '" , token = "' + token + '", otp_type="' + 'otp verification' + '" , expirein="' + expirein + '", created_at =" ' + date + '"   ', function (err, result) {
            if (err) throw err
          })



          return res.status(200).json({
            status: 1,
            token: token,
            result: result[0],
            otp: resetToken,
            message: "Successfully Sent"
          })

        }

      }


    }
    catch (err) {
      return res.status(400).json({
        status: 0,
        message: "Invalid Email! Please try again"
      })
    }



  });


}

exports.getOtp = (req, res) => {

  dbConn.query('SELECT otp ,expirein  FROM otps WHERE otp="' + req.body.otp + '"', function (err, results) {
    if (err) throw err
    var otp = req.body.otp;
    try {
      var currentTime = new Date().getTime();
      var diff = results[0].expirein - currentTime;
      if (diff < 0) {
        res.status(401).send('Otp Expired');

      } else {
        if (req.body.otp == results[0].otp) {
          console.log('otp', otp)
          console.log('expirein', results[0].expirein);
          return res.status(200).json({
            status: 1,
            message: "OTP Verified",
            result: results[0]
          })
        }
      }
      // console.log('otp', req.body.id)

    } catch (err) {
      return res.status(400).json({
        status: 0,
        message: "ENTER valid OTP",
      })
    }
  })

}

// -------------------------------send Email End--------------------------------------------


// ------------------------------------Update password Start-----------------------------------------------

exports.updatePassword = async (req, res, next) => {

  var password = req.body.password;


  dbConn.query(`SELECT * FROM otps WHERE token= ${'token'}`, [req.params.token
  ], function (err, result) {

    if (err) throw err;

    console.log('password', password);

    if (result.length > 0) {
      var saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          var data = {
            password: hash
          }
          console.log('password11', password)
          console.log('user_id', result[0].user_id);
          dbConn.query('UPDATE users SET password ="' + password + '" WHERE id = "' + result[0].user_id + '" ', data, function (err, result) {
            if (err) {
              console.log('err', err);
            }
          });
        });
      });
      return res.status(200).json({
        status: 1,
        message: "Successfully Updated",
        result: result[0]
      })
    } else {
      console.log(err);
      return res.send(400).json({
        status: 0,
        message: "Error"
      })
    }
  });
}


// ------------------------------------Update Password End------------------------------------------
// 

exports.login_user = (req, res) => {
  const body = req.body;
  console.log("body data ", body);

  LoginModel.login(body.email, (err, results) => {
    console.log("results data ", results);
    const [resultData] = results;
    const full_name = resultData.full_name;
    const id = resultData.id;
    const role_id = resultData.role_id;
    console.log('full_name', full_name);


    console.log("resultData : ", resultData);

    if (err) {
      console.log(err);
    }
    if (!results || (resultData === null)) {
      return res.json({
        success: 0,
        message: "Invalid email or password"
      });
    }
    const result = (body.password === resultData.password);
    console.log(result);

    const hashPass = bcrypt.hash(req.body.password, 12);
    if (result && role_id === 1) {

      const jsontoken = sign({ result: results }, "qwe1234", {
        expiresIn: "1h"
      });
      console.log(jsontoken);
      return res.json({
        success: 1,
        message: "login successfully",
        token: jsontoken,
        full_name: full_name,
        id: id,
        data: resultData
      });

    } else {
      return res.json({
        success: 0,
        message: "Invalid email or password"
      });
    }

  })

}



