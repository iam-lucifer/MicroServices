const dbConn = require('../config/db.config');
const CategoryModel = require('./category.model');

// USing PROMISE
exports.getCategoryList = async (req, res) => {
	try {
		const categories = await CategoryModel.getAllCategories();
		res.status(200).json({ categories });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};
 
// GEt Category where Parentid=0 
exports.getSubCategoryList = async (req, res) => {    
	try {
		const getcategory = await CategoryModel.getCategory();
		res.status(200).json({ getcategory });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

exports.getSubCategoryListByID = async (req, res) => {
	try {
		const getcategoryid = await CategoryModel.getCategoryByID(req.params.id);
		res.status(200).json({ getcategoryid });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

// get Subcategory
exports.getSubCategory = async (req, res) => {
	try {
		const getsubcategory = await CategoryModel.getSubCategory(req.params.id);
		res.status(200).json({ getsubcategory });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

exports.getSubCategories = async (req, res) => {
	try {
		const getsubcategory = await CategoryModel.getSubCategories(req.params.id);
		res.status(200).json({ getsubcategory });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

exports.getTitless = async (req, res) => {
	try {
		const gettitle = await CategoryModel.getTitles(req.params.id);
		res.status(200).json({ gettitle });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

exports.getSubTitless = async (req, res) => {
	try {
		const getsubtitle = await CategoryModel.getSubTitle();
		res.status(200).json({ getsubtitle });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

// get title
exports.getTitleList = async (req, res) => {
	try {
		const title = await CategoryModel.getTitle(req.params.id);
		const title1 = req.body;
		console.log('TItle', title1);
		res.status(200).json({ title });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

// get New title
exports.getNewTitleList = async (req, res) => {
	try {
		const newtitle = await CategoryModel.getNewTitle();
		res.status(200).json({ newtitle });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

exports.getNewTitleListByID = async (req, res) => {
	try {
		const newtitlebyid = await CategoryModel.getNewTitleById(req.params.id);
		res.status(200).json({ newtitlebyid });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

exports.getSubList = async (req, res) => {
	try {
		const newsub = await CategoryModel.getNewSub();
		res.status(200).json({ newsub });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
		console.log(error);
	}
};

// GetUserByID using PROMISE
exports.getCategoryByID = async (req, res) => {
	try {
		const categoryid = await CategoryModel.getCategoryByID(req.params.id);
		res.status(200).json({ categoryid });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
	}
};

// Create User Using Promise
exports.createNewCategory = async (req, res) => {
	const categoryData1 = req.body;
	console.log('Category Data', categoryData1);
	const categoryData = new CategoryModel(req.body);
	try {

		const catData = await CategoryModel.createCategory(categoryData);
		console.log('Cat', categoryData)

		res.status(200).json({ catData });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
	}

};

// update User using PROMISE
exports.updateCategory = async (req, res) => {
	const categoryData = new CategoryModel(req.body);
	try {
		const upCategory = await CategoryModel.updateCategory(req.params.id, categoryData);
		res.status(200).json({ upCategory });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
	}
};

// Delete Category
exports.deleteCategory = async (req, res) => {
	try {
		const deletecat = await CategoryModel.deleteCategory(req.params.id);
		res.status(200).json({ deletecat });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
	}
};



