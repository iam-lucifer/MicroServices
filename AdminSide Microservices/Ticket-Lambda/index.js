const serverless = require('serverless-http');
const express = require('express');
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require ('cors');
// const verifyToken = require('./src/Auth/auth'); 
// const jwtUniqueKey = require('jsonwebtoken');

// Create express app
const app = express();
app.use(cors());

// setup server port
const port= process.env.PORT || 7003;

// parse request data contentt type:application/urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/',(req, res)=>{
    res.send("Hello This is port 7003! Ticket Services");
});

// Set up Global configuration access
dotenv.config();


const ticketRoutes = require('./Ticket/ticket.route');
const historyRoutes = require('./History/history.route');
const commentRoutes = require('./Comment/comment.route')

app.use('/ticket/ticket-main' , ticketRoutes);
app.use('/ticket/history' , historyRoutes);
app.use('/ticket/comment' , commentRoutes);



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

module.exports.handler = serverless(app);