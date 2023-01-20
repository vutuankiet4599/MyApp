import express from "express";
import ProductController from "../controllers/ProductController";
import UserController from "../controllers/UserController";
import * as AuthenticationUser from "../middleware/AuthenticationUser";

let router = express.Router();

const InitAPI = (app) => {
    router.post("/api/v1/account", UserController.AccountRegister);
    router.get("/:username/:email", UserController.ConfirmAccount);
    router.post("/api/v1/login", UserController.Login);
    // router.post("/api/v1/confirm-user", AuthenticationUser.AccpetAccount, UserController.ConfirmUserToAdmin);

    router.get("/api/v1/product", ProductController.GetAllProduct);
    router.get("/api/v1/product/:id", ProductController.GetOneProduct);
    router.post("/api/v1/product", AuthenticationUser.AccpetAccount, ProductController.InsertNewProduct);
    router.post("/api/v1/product-delete", AuthenticationUser.AccpetAccount, ProductController.DeleteOneProduct);
    router.put("/api/v1/product", AuthenticationUser.AccpetAccount, ProductController.UpdateOneProduct);
    
    router.route("*").get((req, res) => {
        res.status(400).json({err:"Not found"})
    }).post((req, res) => {
        res.status(400).json({err:"Not found"})
    }).put((req, res) => {
        res.status(400).json({err:"Not found"})
    }).delete((req, res) => {
        res.status(400).json({err:"Not found"})
    }).head((req, res) => {
        res.status(400).json({err:"Not found"})
    }).options((req, res) => {
        res.status(400).json({err:"Not found"})
    }).patch((req, res) => {
        res.status(400).json({err:"Not found"})
    })

    return app.use("/", router);
}

module.exports = InitAPI;