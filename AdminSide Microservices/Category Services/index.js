const serverless = require('serverless-http');
const express = require('express');
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const CategoryModel = require('./Category/category.model');
// const verifyToken = require('./src/Auth/auth'); 
// const jwtUniqueKey = require('jsonwebtoken');

// Create express app
const app = express();
app.use(cors());


// setup server port
const port= process.env.PORT || 7001;

// parse request data contentt type:application/urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route     
app.get('/',(req, res)=>{
    res.send("Hello This is port 7001! Category Service");
});

// Set up Global configuration access
dotenv.config();


const categoryRoutes = require('./Category/category.route');
const departmentRoutes = require('./Department/dept.route')
 

app.use('/category/categories-main',categoryRoutes);
app.use('/category/departments',departmentRoutes);



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

module.exports.handler = serverless(app);

