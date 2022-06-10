const dbConn = require('../config/db.config');
const HistoriesModel = require('./history.model');


exports.gethistoriesList = async (req, res) => {
  try {
    const histories = await HistoriesModel.getAllHistories();
    console.log(histories);
    res.status(200).json({ histories });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
    console.log(error);
  }
};

exports.gethistories = async (req, res) => {
  try {
    const histories1 = await HistoriesModel.getHistories1(req.params.ticket_id);
    console.log(histories1);
    res.status(200).json({ histories1 });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
    console.log(error);
  }
};

exports.gethistoriesByID = async (req, res) => {
  try {
    const historiesid = await HistoriesModel.getHistoriesByID(req.params.id);
    res.status(200).json({ historiesid });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};

exports.createNewHistories = async (req, res) => {

  console.log('request data', req.body);
  const historiesReqData = new HistoriesModel(req.body);

  try {

    const historiesData = await HistoriesModel.createHistories(historiesReqData);

    res.status(200).json({ historiesData });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }

};


exports.updateHistories = async (req, res) => {
  const userData = new HistoriesModel(req.body);
  try {
    const upData = await HistoriesModel.updateHistories(req.params.id, userData);
    res.status(200).json({ upData });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};