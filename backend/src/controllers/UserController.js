import Services from "../services/Services";
import nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";

require("dotenv").config();

const SendMailConfirm = (username, email) => {
    const PROTOCOL = process.env.PROTOCOL;
    const HOST = process.env.HOST;
    const PORT = process.env.PORT;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASSWORD
        }
    });
      
    let mail_options = {
      from: process.env.MAIL,
      to: email,
      subject: 'Mail confirm account',
      text: `Click this link to confirm account: ${PROTOCOL}://${HOST}:${PORT}/${username}/${email}`
    };
    
    transporter.sendMail(mail_options, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

const AccountRegister = async (req, res) => {
    let data = req.body;
    if (!data.username || !data.password || !data.email) {
        res.status(400).json({
            error: "Lack of required information",
            code: "03"
        });
    }else {
        let {message, code} = await Services.CheckIsExistAccount(data.username, data.password);
        let block = await Services.CheckIsExistAccount(data.email, data.password);
        if(!message || !block.message) {
            res.status(400).json({
                message: "Unkown error",
                code: "05"
            });
            return;
        }
        if (code == "01" && block.code == "01") {
            block = await Services.CreateNewAccount(data);
            if (block.code === "06") {
                if (data.admin) {
                    SendMailConfirm(data.username, data.email);
                }
                res.status(200).json({
                    message: block.message,
                    code: block.code
                });
            }else {
                res.status(400).json({
                    message: block.message,
                    code: block.code
                });
            }
        }else {
            res.status(400).json({
                message: "Registration failed!",
                code: "04"
            });
        }
    }
}

const Login = async (req, res) => {
    let {username, password} = req.body;
    if (!username || !password) {
        res.status(400).json({
            error: "Lack of required information!",
            code: "03"
        });
    }else {
        let {user, message, code} = await Services.CheckIsExistAccount(username, password);
        if (code === "00")
        {
            if (user.accepted !== 1) {
                return res.status(400).json({
                    error: "Account not accepted!",
                    code: "18"
                });
            }

            const token = jwt.sign({
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET);
            
            return res.status(200).json({
                message: message,
                code: code,
                token: token,
                role: user.role,
                username: user.username,
                image: user.img
            });
        }else if(code == "01") {
            return res.status(400).json({
                message: message,
                code: code
            });
        }else if (code == "02") {
            return res.status(400).json({
                message: message,
                code: code
            });
        }else {
            return res.status(400).json({
                message: "Unkown error",
                code: "05"
            });
        }
    }
}

const ConfirmAccount = async (req, res) => {
    let {username, email} = req.params;
    let {message, code} = await Services.AcceptAccountToBeUser(username, email);
    if (code === "01") {
        res.send("Your account not existed!");
    } else if (code === "07") {
        res.send("Confirm success!");
    }else {
        res.send("Something went wrong!");
    }
}

// const ConfirmUserToAdmin = async (req, res) => {
//     let id = req.body.id;
//     if (req.body.user.role !== 1) {
//         return res.status(400).json({
//             message: "Wrong role!",
//             code: "10"
//         });
//     }

//     let {message, code} = Services.SetUserToAdmin(id);
//     if (code === "07") {
//         return res.status(200).json({
//             message: message,
//             code: code
//         });
//     } else {
//         return res.status(400).json({
//             message: message,
//             code: code
//         });
//     }
// }


module.exports = {
    AccountRegister,
    Login,
    ConfirmAccount,
    // ConfirmUserToAdmin
}