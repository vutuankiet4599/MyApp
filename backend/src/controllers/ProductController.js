import Services from "../services/Services";

const GetAllProduct = async (req, res) => {
    let {code, message, data} = await Services.AllProducts();
    if(!message || !code || !data) {
        res.status(400).json({
            message: "Unkown error!",
            code: "05"
        });
    }else {
        res.status(200).json({
            message: message,
            code: code,
            data: data
        })
    }
}

const GetOneProduct = async (req, res) => {
    let {id} = req.params;
    let {code, message, data} = await Services.Product(id);
    if(!message || !code || !data) {
        res.status(400).json({
            message: "Unkown error!",
            code: "05"
        });
    }else {
        res.status(200).json({
            message: message,
            code: code,
            data: data
        })
    }
}

const InsertNewProduct = async (req, res) => {
    let {user, product} = req.body;

    if (user.role === 0) {
        res.status(400).json({
            message: "You don't have permission!",
            code: "13"
        });
    } else {
        let {message, code, new_product} = await Services.NewProduct(product);
        if (!message || code !== "14") {
            res.status(400).json({
                message: "Unknown error!",
                code: "05"
            });
        }else {
            res.status(200).json({
                message: message,
                code: code,
                product: new_product
            })
        }
    }
}

const DeleteOneProduct = async (req, res) => {
    let {id_product} = req.body;
    let role = req.body.user.role;

    if(!id_product) {
        res.status(400).json({
            message: "Lack of required information!",
            code: "03"
        });
        return;
    }

    if (role === 0) {
        res.status(400).json({
            message: "You don't have permission!",
            code: "13"
        });
    } else {
        let {message, code} = await Services.DeleteProduct(id_product);
        if (!message || code !== "15") {
            res.status(400).json({
                message: "Unknown error!",
                code: "05"
            });
        }else {
            res.status(200).json({
                message: message,
                code: code,
            })
        }
    }
}

const UpdateOneProduct = async (req, res) => {
    let {product} = req.body;
    let role = req.body.user.role;

    if (role === 0) {
        res.status(400).json({
            message: "You don't have permission!",
            code: "13"
        });
    } else {
        let {message, code} = await Services.UpdateProduct(product);
        if (!message || code !== "16") {
            res.status(400).json({
                message: "Unknown error!",
                code: "05"
            });
        }else {
            res.status(200).json({
                message: message,
                code: code,
            });
        }
    }
}
module.exports = {
    GetAllProduct,
    GetOneProduct,
    InsertNewProduct,
    DeleteOneProduct,
    UpdateOneProduct
}