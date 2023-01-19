const Users = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("id", id)
    const users = await Users.find({});
    return res.status(200).send({ users });
  } catch (err) {
    return res.status(401).send({ status: 401, err });
  }
};

module.exports = getUsers;
