const express = require('express');
const router = express.Router();
const departmentController = require('./dept.controller');
// const verifyToken = require('../Auth/auth');


// // get all department
router.get('/', departmentController.getdepartmentList);

// // get department by ID
router.get('/:id', departmentController.getdepartmentByID);

// // create new department
router.post('/', departmentController.createNewDepartment);

// // update user
router.put('/:id', departmentController.updateDepartment);

router.delete('/:id', departmentController.DeleteDept);

router.get('/:name',departmentController.filterData);

module.exports = router;