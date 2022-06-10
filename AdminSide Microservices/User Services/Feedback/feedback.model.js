var dbConn = require('../config/db.config');

var Feedbacks = function (feedback) {
  this.id = feedback.id;
  this.user_id = feedback.user_id;
  this.name = feedback.name;
  this.ticket_id = feedback.ticket_id;
  this.mark = feedback.mark;
  this.rating = feedback.rating;
  this.contact = feedback.contact;
  this.feedback = feedback.feedback;
  this.created_at = new Date();
}

// get All Feedbacks
Feedbacks.getAllFeedbacks = () => {

  return new Promise((resolve, reject) => {
    dbConn.query('SELECT * FROM feedbacks', (err, res) => {
      if (err)
        return reject(err);
      else
        resolve(res);
    })
  })
}

// get Feedbacks with mark 1 
Feedbacks.getFeedbackbyMark = () => {

  return new Promise((resolve, reject) => {
    dbConn.query('SELECT * FROM feedbacks WHERE mark = 1', (err, res) => {
      if (err)
        return reject(err);
      else
        resolve(res);
    })
  })
}

Feedbacks.updateFeedback = (id, feedbackData, result) => {

  return new Promise((resolve, reject) => {
    dbConn.query(`UPDATE feedbacks SET  
         mark=?
   WHERE ticket_id=?`, [ feedbackData.mark, id], (err, res) => {
      if (err)
        return reject(err);
      resolve(res);
    });
  })
}

Feedbacks.createFeedback = (feedbackReqData, result) => {

  return new Promise((resolve, reject) => {
    dbConn.query('INSERT INTO feedbacks SET ?', feedbackReqData, (err, res) => {
      if (err)

        return reject(err);
      resolve(res);

    });
  });

},

  module.exports = Feedbacks;
