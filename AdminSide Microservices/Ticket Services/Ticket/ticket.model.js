var dbConn = require('../config/db.config');


var Ticket = function (ticket) {
	this.id = ticket.id;
	this.user_id = ticket.user_id;
	this.created_by = ticket.created_by;
	this.ticket_id = ticket.ticket_id;
	this.category_id = ticket.category_id;
	this.subcategory_id = ticket.subcategory_id;
	this.title_id = ticket.title_id;
	this.department_id = ticket.department_id;
	this.description = ticket.description;
	this.status = ticket.status;
	this.last_changed = new Date();
	this.created_at = new Date();
	this.updated_at = new Date();
}

// Get All USERS
Ticket.getAllTickets = () => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT * FROM tickets', (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

// Get User By ID 
Ticket.getTicketByID = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query('SELECT * FROM tickets WHERE id=? ', id, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
}


Ticket.createTicket = (ticketData, result) => {

    return new Promise((resolve, reject) => {
        dbConn.query('INSERT INTO tickets SET ?', ticketData, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });

},

	Ticket.updateTicket = (id, ticketData, result) => {

		return new Promise((resolve, reject) => {
			dbConn.query(`UPDATE tickets SET  
					 status=?
		 WHERE tickets.id=?`, [ ticketData.status, id], (err, res) => {
				if (err)
					return reject(err);
				resolve(res);
			});
		})
	}

Ticket.getDepartment = () => {

	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT tickets.id , tickets.user_id , tickets.created_by ,
        tickets.ticket_id , tickets.category_id , tickets.subcategory_id ,tickets.title_id , 
       	tickets.description , tickets.department_id , tickets.last_changed , 
       	tickets.status , tickets.created_at , tickets.updated_at , 
       	 departments.name as department_name ,
       	categories.name as category_name ,   c1.name as subcategory_name ,   c2.name as title_name , 
				  users.full_name as username FROM (((((tickets
       	INNER JOIN departments 
       	ON tickets.department_id = departments.id)
       	INNER JOIN categories
       	ON categories.id=tickets.category_id )
       	INNER JOIN categories as c1 ON 
       	c1.id = tickets.subcategory_id)
       	INNER JOIN categories as c2 ON 
	   	 	c2.id = tickets.title_id)
				INNER JOIN users ON
				users.id= tickets.user_id)
       	WHERE c1.parent_id!=0 AND c1.is_subcategory=1 
			 	AND c2.parent_id!=0 AND c2.is_subcategory=0`, (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Ticket.getDepartmentById = (id, result) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`SELECT tickets.id , tickets.user_id , tickets.created_by ,
        tickets.ticket_id , tickets.category_id , tickets.subcategory_id ,tickets.title_id , 
        tickets.description , tickets.department_id , tickets.last_changed , 
        tickets.status , tickets.created_at , tickets.updated_at , 
        departments.id , departments.name as department_name ,
        categories.name as category_name ,  categories.id , c1.name as subcategory_name , c1.id , c2.name as title_name , 
                c2.id , users.id , users.full_name as username 
                FROM (((((tickets
        INNER JOIN departments 
        ON tickets.department_id = departments.id)
        INNER JOIN categories
        ON categories.id=tickets.category_id )
        INNER JOIN categories as c1 ON 
        c1.id = tickets.subcategory_id)
        INNER JOIN categories as c2 ON 
            c2.id = tickets.title_id)
                INNER JOIN users ON
                users.id= tickets.user_id)
        WHERE c1.parent_id!=0 AND c1.is_subcategory=1 
                AND c2.parent_id!=0 AND c2.is_subcategory=0
                AND tickets.id=?
               `, [id], (err, res) => {
			if (err)
				return reject(err);
			else
				resolve(res);
		})
	})
}

Ticket.deleteTicket = (id, result) => {

	return new Promise((resolve, reject) => {
		dbConn.query('DELETE FROM tickets WHERE id=?  ', id, (err, res) => {
			if (err) return reject(err);
			resolve(res);
		});
	});
}

module.exports = Ticket;