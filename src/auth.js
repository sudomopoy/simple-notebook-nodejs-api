var jwt = require("jsonwebtoken")
const config = require("./config")


const signToken = (user = {}) => {
    console.log(user);
    return jwt.sign(user, config.getAccessKey());
}

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send({
        code: "InvalidToken",
        message: "Invalid Token",
    });
    jwt.verify(token, config.getAccessKey(), (err, user) => {
        if (err) return res.status(403).send({
            code: "InvalidToken",
            message: "Invalid Token",
        });
        req.user = user;
        next();
    });
}

module.exports = {
    signToken: signToken,
    verifyToken: verifyToken,
}