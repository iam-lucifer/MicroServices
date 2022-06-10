const serverless = require('serverless-http');
const express = require('express');
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors =require('cors');
// const verifyToken = require('./src/Auth/auth'); 
// const jwtUniqueKey = require('jsonwebtoken');

// Create express app
const app = express();

app.use(cors());

// setup server port
const port= process.env.PORT || 4000;

// parse request data contentt type:application/urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/',(req, res)=>{
    res.send("Hello This is port 4000! User services");
});

// Set up Global configuration access
dotenv.config();

const registrationRoutes = require('./Registration/registration.route');
const frontendLoginRoutes = require('./Login/login.route');
const frontendOtpRoutes = require('./Otp/otp.route');
const frontendFeedbackRoutes = require('./Feedback/feedback.route')



app.use('/users/registration',registrationRoutes);
app.use('/users/loginfrontend', frontendLoginRoutes );
app.use('/users/otpfrontend' , frontendOtpRoutes);
app.use('/users/feedbacksfrontend' , frontendFeedbackRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})


module.exports.handler = serverless(app);
