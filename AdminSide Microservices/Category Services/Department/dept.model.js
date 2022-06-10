var dbConn = require('../config/db.config')


var Departments = function (departments) {

    this.id = departments.id;
    this.name = departments.name;
    this.created_at = new Date()
    this.updated_at = new Date()
}

// Get All Departments
Departments.getAllDepartments = () => {

    return new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM departments', (err, res) => {
            if (err)
                return reject(err);
            else
                resolve(res);
        })
    })
},

    // Get Departments By ID 
    Departments.getDepartmentsByID = (id, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query('SELECT * FROM departments WHERE id=? ', id, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    },

    // FILTER API
    Departments.getFilter = (name, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query('SELECT * FROM departments WHERE name=? ', name, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    },


    Departments.createDepartment = (departmentReqData, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query('INSERT INTO departments SET ?', departmentReqData, (err, res) => {
                if (err)

                    return reject(err);
                resolve(res);

            });
        });

    },

    Departments.updateDepartment = (id, departmentReqData, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query("UPDATE users SET  name=? WHERE id=?", [departmentReqData.role_id, departmentReqData.full_name, departmentReqData.email, departmentReqData.password, id], (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        })
    }
Departments.DeleteDepartment = (id, result) => {

    return new Promise((resolve, reject) => {
        dbConn.query('DELETE FROM departments WHERE id=? ', id, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = Departments;