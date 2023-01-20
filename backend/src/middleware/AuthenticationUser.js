import * as jwt from "jsonwebtoken";
require("dotenv").config();

const AccpetAccount = (req, res, next) => {
    let user = req.body.user;
    if(!user) {
        return res.status(400).json({
            code: "03",
            message: "Lack of required information"
        });
    }

    let header = req.header("Authorization");
    if (!header) {
        return res.status(401).json({
            message: "Authorization header not found!",
            code: "08"
        });
    }

    let token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Wrong token!",
            code: "09"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== user.role) {
            return res.status(401).json({
                message: "Wrong role!",
                code: "10"
            });
        } else if (decoded.username !== user.username) {
            return res.status(401).json({
                message: "Wrong token!",
                code: "09"
            });
        } else {
            next();
        }
    } catch (e) {
        return res.status(403).json({
            message: "Wrong token!",
            code: "09"
        });
    }
};

module.exports = {
    AccpetAccount,
};
