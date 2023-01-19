const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://ghous:ghous@cluster0.pq7qght.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("errr===>", err));

app.use("/api/users", require("./users"));
// app.use("/api/posts", require("./posts"));

app.use("/", (req, res) => {
  res.send(new Date());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
