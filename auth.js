const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if(token == null) return res.status(401);

    jwt.verify(token, "Snippet_SceretKey", (err, user) => {
       if(err) return res.status(403);
       req.user = user;
       next();
    });
}

function generateAccessToken(email){
    return jwt.sign({data: email}, "Snippet_SceretKey", {
        expiresIn: "365d",
    });
}

function generateAccessToken1(data1,data2){
    return jwt.sign({data1: data1,data2: data2}, "Snippet_SceretKey", {
        expiresIn: "365d",
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    generateAccessToken1,
};