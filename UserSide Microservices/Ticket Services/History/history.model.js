var dbConn = require('../config/db.config')

var Histories = function (histories) {
    this.id = histories.id;
    this.ticket_id = histories.ticket_id;
    this.user_id = histories.user_id;
    this.message = histories.message;
    //    this.message = histories.updatemsg+'has updated ticket successfully';
    this.created_at = new Date();

}

// Get All Departments
Histories.getAllHistories = () => {

    return new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM histories', (err, res) => {
            if (err)
                return reject(err);
            else
                resolve(res);
        })
    })
},


    Histories.getHistories1 = (ticket_id) => {

        return new Promise((resolve, reject) => {
            dbConn.query(`SELECT histories.message,histories.user_id,histories.ticket_id,users.id,users.full_name
        FROM(histories 
        INNER JOIN users ON users.id = histories.user_id) 
        WHERE histories.ticket_id = ? `, [ticket_id], (err, res) => {
                if (err)
                    return reject(err);
                else
                    resolve(res);
            })
        })
    },

    // Get Histories By ID 
    Histories.getHistoriesByID = (id, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query('SELECT * FROM histories WHERE id=? ', id, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    },

    Histories.createHistories = (historieReqData, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query('INSERT INTO histories SET ?', historieReqData, (err, res) => {
                if (err)

                    return reject(err);
                resolve(res);

            });
        });

    },

    Histories.updateHistories = (id, historieReqData, result) => {

        return new Promise((resolve, reject) => {
            dbConn.query("UPDATE histories SET  ticket_id=?, user_id=?, message=?  WHERE id=?", [historieReqData.ticket_id, historieReqData.user_id, historieReqData.message, id], (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        })
    }

module.exports = Histories;