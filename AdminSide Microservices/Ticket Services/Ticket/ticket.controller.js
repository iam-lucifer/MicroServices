// const { id } = require('date-fns/locale');
// const { id } = require('date-fns/locale');
const dbConn = require('../config/db.config');
const TicketModel = require('./ticket.model');

// USing PROMISE
exports.getTicketList = async (req, res) => {
    try {
      const tickets = await TicketModel.getAllTickets();
      res.status(200).json({ tickets });
    } catch (error) {
      res.status(400).json({ message: `${error}` });
      console.log(error);
    }
  };

  // to fetch department
  exports.getDept = async (req, res) => {
    try {
      const dept = await TicketModel.getDepartment();
      res.status(200).json({ dept });
    } catch (error) {
      res.status(400).json({ message: `${error}` });
      console.log(error);
    }
  };

  // get dept byID
  exports.getDeptById = async (req, res) => {
    try {
      const dept = await TicketModel.getDepartmentById(req.params.id);
      res.status(200).json({ dept });
    } catch (error) {
      res.status(400).json({ message: `${error}` });
      console.log(error);
    }
  };

// GetUserByID using PROMISE
exports.getTicketByID = async(req , res)=>{
    try{
        const ticketid = await TicketModel.getTicketByID(req.params.id);
        res.status(200).json({ticketid});
    }catch(error){
        res.status(400).json({message:`${error}`});
    }
};

// Create User Using Promise
exports.createNewTicket = async (req, res) => {
  const ticketData = new  TicketModel(req.body);
  
try {
 
   const ticketsData = await TicketModel.createTicket(ticketData);

  res.status(200).json({ 
    success:1,
    message:"Ticket inserted Successfully",
    data:ticketsData,
    id:ticketsData.insertId
   });
  console.log('ticketsData' , ticketsData)
} catch (error) {
  res.status(400).json({ message: `${error}` });
} 

};


// exports.createNewTicket = (req, res)=>{
//   const body = req.body;
//   const ticketData = new TicketModel(body);
//   console.log('body data', ticketData)
  
//   TicketModel.createTicket(ticketData , (err , result)=>{
//     console.log('resultdata' , result);
//     const[resultData]= result;
//     const id = resultData.id;
//     console.log('TicketData:' , resultData);
//     console.log('ticketid', id);

//     if(err) throw err
//      return res.json({
//        success:1,
//        data: ticketData,
//        id: resultData.id,
//        message:"Ticket Inserted Successfully"
//      })
//   })
// } 

// update User using PROMISE
exports.updateTicket = async(req , res)=>{
    const ticketData = new TicketModel(req.body);
    try{
        const upTicket = await TicketModel.updateTicket(req.params.id , ticketData);
        res.status(200).json({upTicket});
    }catch(error){
        res.status(400).json({message: `${error}`});
    }
};

// Delete
exports.deleteTicket = async (req, res) => {
	try {
		const deletetick = await TicketModel.deleteTicket(req.params.id);
		res.status(200).json({ deletetick });
	} catch (error) {
		res.status(400).json({ message: `${error}` });
	}
};

