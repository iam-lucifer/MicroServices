const dbConn = require('../config/db.config');
const DepartmentModel = require('./dept.model');

exports.getdepartmentList = async (req, res) => {
  try {
    const department = await DepartmentModel.getAllDepartments();
    console.log(department);
    res.status(200).json({ department });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
    console.log(error);
  }
};

exports.getdepartmentByID = async (req, res) => {
  try {
    const departmentid = await DepartmentModel.getDepartmentsByID(req.params.id);
    res.status(200).json({ departmentid });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};

// FILTER
exports.filterData = async (req, res) => {

  console.log('request data', req.body);
  const departmentFilter = new DepartmentModel(req.body.value);

  try {

    const filterData = await DepartmentModel.getFilter(departmentFilter);

    res.status(200).json({ filterData });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }

};

exports.createNewDepartment = async (req, res) => {

  console.log('request data', req.body);
  const departmentReqData = new DepartmentModel(req.body);

  try {

    const departmentData = await DepartmentModel.createDepartment(departmentReqData);

    res.status(200).json({ departmentData });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }

};


exports.updateDepartment = async (req, res) => {
  const userData = new DepartmentModel(req.body);
  try {
    const upData = await DepartmentModel.updateDepartment(req.params.id, userData);
    res.status(200).json({ upData });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};

exports.DeleteDept = async (req, res) => {
  try {
    const deletedept = await DepartmentModel.DeleteDepartment(req.params.id);
    res.status(200).json({ deletedept });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};  