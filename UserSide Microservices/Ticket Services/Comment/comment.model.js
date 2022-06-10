var dbConn = require('../config/db.config')

var Comments = function (comments) {
  this.id = comments.id;
  this.ticket_id = comments.ticket_id;
  this.user_id = comments.user_id;
  this.message = comments.message;
  this.created_at = new Date();
  
}

// Get All Departments
Comments.getAllComments = () => {

  return new Promise((resolve, reject) => {
    dbConn.query('SELECT * FROM comments', (err, res) => {
      if (err)
        return reject(err);
      else
        resolve(res);
    })
  })
},


  Comments.getComments = (ticket_id) => {

    return new Promise((resolve, reject) => {
      dbConn.query(`SELECT comments.message,comments.user_id,comments.ticket_id,users.id,users.full_name
            FROM(comments 
            INNER JOIN users ON users.id = comments.user_id) 
            WHERE comments.ticket_id= ? `, [ticket_id], (err, res) => {
        if (err)
          return reject(err);
        else
          resolve(res);
      })
    })
  },


  Comments.createComments = (commentReqData, result) => {

    return new Promise((resolve, reject) => {
        dbConn.query('INSERT INTO comments SET ?', commentReqData, (err, res) => {
            if (err)

                return reject(err);
            resolve(res);

        });
    });

},

  module.exports = Comments;