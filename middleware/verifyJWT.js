const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.spilt('')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendstatus(403), //invalidtoken
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInforoles;
            next()
        }
    );
}

module.exports = verifyJWT