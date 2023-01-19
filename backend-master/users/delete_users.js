const users = require("../constants/users");

const deleteUsers = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((data) => data.id === +id);
  users.splice(index, 1);
  res.status(200).send({ status: 200, message: "user deleted successfuly" });
};

module.exports = deleteUsers;
