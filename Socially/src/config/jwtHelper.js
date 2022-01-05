const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    //console.log(req.headers)
    if ('authorization' in req.headers) {
        token = req.headers['authorization']//.split(' ')[1]; //authorization: Bearer [jwt]
        token = token.split(' ')[1];                          //                 [0]   [1] 
    }
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided" });
    }
    else { //console.log(token);
        jwt.verify(token, process.env.SECRET_KEY,
            (err, decoded) => {
                if (err) { return res.status(500).send({ auth: false, message: "Token authentication Failed or token maybe expired" }); }

                else { //console.log("oooh ha");
                    req._id = decoded._id;
                    //console.log(req._id)
                    next();
                }
            }
        )
    }
}  