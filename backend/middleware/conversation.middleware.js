const jwt = require("jsonwebtoken");

function conversation(req,res,next){
    try{
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId= verified.userId
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = conversation