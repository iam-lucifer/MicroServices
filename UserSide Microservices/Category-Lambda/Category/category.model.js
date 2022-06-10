var dbConn = require('../config/db.config');

var Category = function (category) {
	this.id = category.id;
	this.parent_id = category.parent_id;
	this.name = category.name;
	this.is_subcategory = category.is_subcategory;
	this.created_at =new Date()
    this.updated_at = new Date()
	
}

// Get All USERS
Category.getAllCategories = () => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT * FROM categories', (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

// Get Category with Parent Id = 0
Category.getCategory = () => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT  id , parent_id , name as categoryname ,is_subcategory,created_at , updated_at    FROM categories WHERE parent_id=0', (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Category.getCategoryByID = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT  id , parent_id , name as categoryname ,is_subcategory,created_at , updated_at    FROM categories WHERE parent_id=0 AND id=?', id, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

// getSubCategory

Category.getSubCategories = (id) => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c1.id as category_id , c1.name as category_name , c2.name as subcategory_name , c2.parent_id FROM categories as c1
		INNER JOIN categories as c2
		ON c1.id = c2.parent_id
		WHERE c2.is_subcategory=1` , id, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Category.getSubCategory = (id) => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c2.id as subcategory_id , 
		c1.name as category_name , c2.name as subcategory_name , 
		c2.parent_id FROM categories as c1
		INNER JOIN categories as c2
		ON c1.id = c2.parent_id
		WHERE c2.parent_id=${id} `, id, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}


Category.getTitles = (id) => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c2.id as title_id , c1.name as subcategory_name , c2.name as title_name , c2.parent_id FROM categories as c1
		INNER JOIN categories as c2
		ON c1.id = c2.parent_id
		WHERE c1.parent_id!=0 AND c2.is_subcategory=0 AND c2.parent_id=${id} `, id, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Category.getSubTitle = () => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c1.id , c1.parent_id , c1.created_at , c2.name as subcategory_name , c1.name as title_name,c1.updated_at   FROM categories as c1 
		INNER JOIN  categories as c2		
		ON c1.parent_id = c2.id
		WHERE c1.parent_id!=0 AND c1.is_subcategory=0 ` , (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

// getting Title
Category.getTitle = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT id , parent_id , name as subcategoryname , is_subcategory , created_at , updated_at  FROM categories WHERE parent_id!='${id}' AND is_subcategory=1`, id, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Category.getNewTitle = () => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c1.id as category_id , c1.parent_id , c1.created_at , c2.name as category_name , c1.name as title   FROM categories as c1 
		INNER JOIN  categories as c2		
		ON c1.parent_id = c2.id
		WHERE c1.parent_id!=0 AND c1.is_subcategory=0  ` , (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Category.getNewTitleById = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c1.id , c1.parent_id , c1.created_at , c2.name as category_name , c1.name as title   FROM categories as c1 
		INNER JOIN  categories as c2		
		ON c1.parent_id = c2.id
		WHERE c1.parent_id!=0 AND c1.is_subcategory=0 AND c1.id =? ` , id, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Category.getNewSub = () => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT c1.id , c1.parent_id , c1.created_at , c2.name as category_name , c1.name as subcategory_name   FROM categories as c1 
		INNER JOIN  categories as c2		
		ON c1.parent_id = c2.id
		WHERE c1.parent_id!=0 AND c1.is_subcategory=1 ` , (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

// Get User By ID 
Category.getCategoryByID = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT * FROM categories WHERE id=?  ', id, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
}

Category.createCategory = (categoryData, result) => {
	console.log('models', categoryData);
	return new Promise((resolve, reject) => {
		dbConn.query('INSERT INTO categories SET ?', categoryData, (err, res) => {
			// res.send(categoryData);
			if (err)

				return reject(err);
			resolve(categoryData);

		});
	});

},

	Category.updateCategory = (id, categoryData, result) => {

		return new Promise((resolve, reject) => {
			dbConn.query("UPDATE categories SET  parent_id=?, name=? WHERE id=?", [categoryData.parent_id, categoryData.name, id], (err, res) => {
				if (err)
					return reject(err);
				resolve(res);
			});
		})
	}

// Delete Category
Category.deleteCategory = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query('DELETE FROM categories WHERE id=?  ', id, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
}

module.exports = Category;