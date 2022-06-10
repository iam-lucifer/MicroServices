const serverless = require('serverless-http');
const express = require('express');
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors =  require('cors');
// const verifyToken = require('./src/Auth/auth'); 
// const jwtUniqueKey = require('jsonwebtoken');

// Create express app
const app = express();
app.use(cors());

// setup server port
const port= process.env.PORT || 4002;

// parse request data contentt type:application/urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/',(req, res)=>{
    res.send("Hello World");
});

// Set up Global configuration access
dotenv.config();



const frontendTicketRoutes = require('./Ticket/ticket.route');
const frontendHistoryRoutes = require('./History/history.route');
const frontendCommentRoutes = require('./Comment/comment.route');


app.use('/tickets/tickets-all' , frontendTicketRoutes);
app.use('/tickets/histories' , frontendHistoryRoutes);
app.use('/tickets/comments' , frontendCommentRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

module.exports.handler = serverless(app);
