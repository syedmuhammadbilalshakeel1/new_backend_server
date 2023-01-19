const express = require("express");
var jwt = require('jsonwebtoken');

const router = express.Router();

const verifyToken = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            var decoded = jwt.verify(token, 'saylani');
            console.log("chal raha hai", decoded)
            next()
        } else {
            res.status(401).send({ message: "token not provided" })
        }
    } catch (err) {
        res.status(401).send({ message: "unauthrized" })
    }
}

router.get("/", verifyToken, require("./get_users"));
router.post("/", require("./add_users"));
router.post("/login", require("./login"));
router.delete("/:id", require("./delete_users"));

module.exports = router;
