const awsServerlessExpress = require('aws-serverless-express');
// const serverless = require('serverless-http');
const express = require('express');
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors')


// Create express app
const app = express();
app.use(cors());

// setup server port
const port= process.env.PORT || 7000;

// parse request data contentt type:application/urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/',(req, res)=>{
    res.send("Hello! This is port 7000 User Services");
});

// Set up Global configuration access
dotenv.config();


const otpRoutes = require('./Otp/otp.route');
const loginRoutes = require('./Login/login.route');
const feedbackRoutes = require('./Feedback/feedback.route')


app.use('/user/login', loginRoutes);
app.use('/user/feedback' , feedbackRoutes);
app.use('/user/otps' , otpRoutes);



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

const app = awsServerlessExpress.createServer(server, null, binaryMimeTypes);
exports.handler = (event, context) => awsServerlessExpress.proxy(app, event, context);


// module.exports.handler = serverless(app);

