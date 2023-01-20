import LoginPage from '../components/LoginPage';
import Layouts from '../components/Layouts';
import RegisterPage from '../components/RegisterPage';
import CardDetail from '../components/CardDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import NewProduct from '../components/NewProduct';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layouts />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="card/:id" element={<CardDetail />} />
                    <Route path="new" element={<NewProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
