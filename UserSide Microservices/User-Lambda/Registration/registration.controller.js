// const { hashSync, genSaltSync } = require("bcrypt");
const RegisterModel = require('./registration.model')


exports.Register = (req, res) => {
  console.log("data",req.body)
  const data = req.body;
  // const salt = genSaltSync(10);
  // data.password = hashSync(data.password, salt);
  if (data.full_name === "" || data.email == "" || data.password === "") {
    res.send({ message: 'please fill all fields' });
    console.log("fill data data");
  } else {
    // console.log("validdata");
    // console.log("apikgljfkgjf",data)
    //  console.log("email idd",email) 
    RegisterModel.get_user(data, (err, user) => {
      console.log(data)
      // console.log(user);
      if (err) {
        res.send(err);
        res.json({ status: false, message: 'Somthing went wrong', data: user })
      } else {
        res.send({ data: data});
        // res.send({ message: user.message });
      }
    })

  }

}