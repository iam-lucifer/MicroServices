const serverless = require('serverless-http');
const express = require('express');
const bodyParser= require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
// const verifyToken = require('./src/Auth/auth'); 
// const jwtUniqueKey = require('jsonwebtoken');

// Create express app
const app = express();
app.use(cors());


// setup server port
const port= process.env.PORT || 4001;

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


const frontendCategoryRoutes = require('./Category/category.route')
const frontendDepartmentRoutes = require('./Department/department.route')

app.use('/categories/categories-all', frontendCategoryRoutes);
app.use('/categories/department' , frontendDepartmentRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

module.exports.handler = serverless(app);
