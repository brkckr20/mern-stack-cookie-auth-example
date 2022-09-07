const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token){
            return res.status(400).json({
                errorMessage: "Yetkisiz erişim!!"
            })
        }

        const verified = jwt.verify(token,"secret123");

        req.user = verified.user;
        next();

    } catch (err) {
        console.log(err);
        res.status(400).json({
            errorMessage: "Yetkisiz erişim!"
        })
    }
}

module.exports = auth;