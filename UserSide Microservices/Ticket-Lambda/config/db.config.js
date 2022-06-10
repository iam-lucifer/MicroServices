const mysql = require('mysql');

// sql connection
const dbConn = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6496575',
    password:  'UI1zQf1TTt',
    database:'sql6496575'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully');
})

module.exports = dbConn;

