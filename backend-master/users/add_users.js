const users = require("../constants/users");
const Users = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require('jsonwebtoken');

let count = users.length;

const schema = Joi.object({
  firstName: Joi.string().required().max(10),
  lastName: Joi.string().required().max(10),
  email: Joi.string().required().email(),
  phone: Joi.string().required().length(10),
  password: Joi.string().required().max(6),
  role: Joi.string()
})

const addUsers = async (req, res) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    const users = await Users.find({ email: req.body.email })
    if (users.length) {
      return res.status(401).send({
        status: 401,
        message: "user already exists"
      });
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    let userObj = {
      ...req.body,
      password: hash,
    };
    const user = new Users(userObj);
    console.log("req.body", req.body);
    const response = await user.save();
    console.log("res", response);

    var token = jwt.sign({ email: res.email, _id: res._id, role: res.role }, 'saylani');

    return res.status(200).send({ status: 200, message: "user added successfuly", token });
  } catch (err) {
    return res.status(401).send({
      status: 401,
      err: err
    });
  }
};

module.exports = addUsers;
