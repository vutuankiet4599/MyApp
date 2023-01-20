import db from "../models"
import {Op} from "sequelize"
import * as bcrypt from "bcrypt";
const saltRounds = 10;

const AllProducts = () => {
    return new Promise(async (resolve, reject) => { 
        try {
            let products = await db.Product.findAll();
            resolve({
                message: "Get products success!",
                code: "12",
                data: products
            });
        } catch (e) {
            reject(e);
        }
    })
}

const Product = (id) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let product = await db.Product.findByPk(id);
            resolve({
                message: "Get products success!",
                code: "12",
                data: product
            });
        } catch (e) {
            reject(e);
        }
    })
}

const NewProduct = (product) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let new_product = await db.Product.create(product);
            resolve({
                message: "Insert product success!",
                code: "14",
                new_product: new_product
            })
        } catch (e) {
            reject(e);
        }
    })
}

const DeleteProduct = (id_product) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let product = await db.Product.findByPk(id_product);
            await product.destroy();
            resolve({
                message: "Delete product success!",
                code: "15"
            })
        } catch (e) {
            reject(e);
        }
    })
}

const UpdateProduct = (data) => {
    return new Promise(async (resolve, reject) => { 
        try {
            if (!data.id) {
                resolve({
                    message: "Lack of required information!",
                    code: "03"
                });
            }
            
            let product = await db.Product.findByPk(data.id);
            product.name = data.name ? data.name : product.name;
            product.brand = data.brand ? data.brand : product.brand;
            product.color = data.color ? data.color : product.color;
            product.price = data.price ? data.price : product.price;
            product.description = data.description ? data.description : product.description;
            product.image = data.image ? data.image : product.image;
            product.updatedAt = Date.now();
            await product.save();
            resolve({
                message: "Update product success!",
                code: "16"
            })

        } catch (e) {
            reject(e);
        }
    })
}

const CheckIsExistAccount = (username, password) => {
    let condition = {
        [Op.or]: [
            {
                username: username
            },
            {
                email: username
            }
        ]
    }
    return new Promise(async (resolve, reject) => { 
        try {
            let user = await db.User.findOne({
                where: condition
            });

            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        resolve({
                            message: "Unkown error!",
                            code: "05"
                        })
                    }

                    if (result) {
                        resolve({
                            message: "Account is existed!",
                            code: "00",
                            user: user
                        })
                    }else {
                        resolve({
                            message: "Password wrong!",
                            code: "02",
                        })
                    }
                })
            }else {
                resolve({
                    message: "Username or password is not existed!",
                    code: "01"
                })
            }
        } catch (e) {
            reject(e)
        }
     })
}

const CreateNewAccount = (data) => {
    return new Promise((resolve, reject) => { 
        try {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (!err) {
                    bcrypt.hash(data.password, salt, (err, hashed_password) => {
                        if (!err) {
                            db.User.create({
                                username: data.username,
                                password: hashed_password,
                                firstName: data.firstName ? data.firstName : "",
                                lastName: data.lastName ? data.lastName : "",
                                email: data.email ? data.email : "",
                                phone: data.phone ? data.phone : "",
                                img: data.img ? data.img : "",
                                role: 0,
                                accepted: 1
                            })
                            resolve({
                                message: "Registration successfully",
                                code: "06"
                            })
                        }else {
                            resolve({
                                message: "Unkown error!",
                                code: "05"
                            })
                        }
                    })
                }else {
                    resolve({
                        message: "Unkown error!",
                        code: "05"
                    })
                }
            });
        } catch (e) {
            reject(e)
        }
     })
}

const AcceptAccountToBeUser = (username, email) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let user = await db.User.findOne({
                where: {
                    username: username,
                    email: email
                }
            });

            if (!user) {
                resolve({
                    message: "Username or password is not existed",
                    code: "01"
                })
            } else {
                user.accepted = 1;
                user.role = 1;
                await user.save();
                resolve({
                    message: "Update account successfully",
                    code: "07"
                })
            }
        } catch (e) {
            reject(e);
        }
     })
}

// const SetUserToAdmin = (id) => {
//     return new Promise(async (resolve, reject) => { 
//         try {
//             let user = await db.User.findOne({
//                 where: {
//                     id: id
//                 }
//             });

//             if (!user) {
//                 resolve({
//                     message: "Username or password is not existed",
//                     code: "01"
//                 });
//             } else {
//                 user.role = 1;
//                 await user.save();
//                 resolve({
//                     message: "Update account successfully",
//                     code: "07"
//                 });
//             }
//         } catch (e) {
//             reject(e);
//         }
//     });
// }
module.exports = {
    AllProducts,
    Product,
    NewProduct,
    DeleteProduct,
    UpdateProduct,
    CheckIsExistAccount,
    CreateNewAccount,
    AcceptAccountToBeUser,
    // SetUserToAdmin
}