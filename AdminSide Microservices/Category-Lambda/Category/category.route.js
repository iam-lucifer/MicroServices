const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
var jwt = require("jsonwebtoken");

// get all users
router.get('/', categoryController.getCategoryList);

// getSubCategory
router.get('/sub', categoryController.getSubCategoryList);

router.get('/title/:id', categoryController.getTitless)

router.get('/title', categoryController.getSubTitless)

// to get subcategory
router.get('/subcategory/:id', categoryController.getSubCategory)

router.get('/newsub', categoryController.getSubList)

// get Title
router.get('/tit', categoryController.getTitleList);

// // get user by ID
router.get('/:id', categoryController.getCategoryByID);

// create new user
router.post('/', categoryController.createNewCategory);

// update user
router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory)

module.exports = router;

