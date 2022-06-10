const dbConn = require('../config/db.config');
const CommentsModel = require('./comment.model');


exports.getcommentList = async (req, res) => {
  try {
    const comments = await CommentsModel.getAllComments();
    console.log(comments);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
    console.log(error);
  }
};

exports.getcomment = async (req, res) => {
  try {
    const comments1 = await CommentsModel.getComments(req.params.ticket_id);
    console.log(comments1);
    res.status(200).json({ comments1 });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
    console.log(error);
  }
};

exports.createNewComment = async (req, res) => {

  console.log('request data', req.body);
  const commentReqData = new CommentsModel(req.body);

  try {

    const commentsData = await CommentsModel.createComments(commentReqData);

    res.status(200).json({ commentsData });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }

};




