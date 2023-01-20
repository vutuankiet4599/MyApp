import express from "express";
import cors from "cors";
import InitAPI from "./routers/api";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

InitAPI(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})