import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import IReduxState from "../redux/ReduxState";
import en from "../languages/en.json";
import vi from "../languages/vi.json";
import "../styles/Register.scss";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { toast } from "react-toastify";
// require("dotenv").config();

const Register = (props: any) => {
    let [language, setLanguage] = useState(en);
    let [username, setUsername] = useState<string>("");
    let [password, setPassword] = useState<string>("");
    let [first_name, setFirstName] = useState<string>("");
    let [last_name, setLastName] = useState<string>("");
    let [email, setEmail] = useState<string>("");
    let [phone, setPhone] = useState<string>("");
    let [img, setImage] = useState<string>("");
    let [admin, setAdmin] = useState<boolean>(false);
    let [image_file, setImageFile] = useState<FileList | null>();
    let navigate:NavigateFunction = useNavigate();

    useEffect(() => {
        if (props.language === true) {
            setLanguage(vi);
        } else {
            setLanguage(en);
        }
    }, [props.language]);

    const HandleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(image_file) {
            let image_ref:StorageReference = ref(storage, `/images/${image_file[0].name + v4()}`);
            await uploadBytes(image_ref, image_file[0]).then(async (res) => {
                await getDownloadURL(res.ref).then(url => {
                    img = url;
                })
            }).catch((e) => {
                toast.error(language.error.img);
                console.log(e);
            });
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/account`, {
            username: username,
            password: password,
            firstName: first_name,
            lastName: last_name,
            email: email,
            phone: phone,
            img: img,
            admin: admin
        }).then(res => {
            console.log(res.data);
            toast.success(language.success.register);
            navigate("/");
        });
    }

    return (
        <div className="register-page">
            <p>{language.registerpage}</p>
            <div className="form-element">
                <label htmlFor="username">{language.user.username}</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} id="username" required />
            </div>
            <div className="form-element">
                <label htmlFor="password">{language.user.password}</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" required />
            </div>
            <div className="form-element">
                <label htmlFor="firstname">{language.user.firstname}</label>
                <input type="text" value={first_name} onChange={(event) => setFirstName(event.target.value)} id="firstname" />
            </div>
            <div className="form-element">
                <label htmlFor="lastname">{language.user.lastname}</label>
                <input type="text" value={last_name} onChange={(event) => setLastName(event.target.value)} id="lastname" />
            </div>
            <div className="form-element">
                <label htmlFor="email">{language.user.email}</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} id="email" required />
            </div>
            <div className="form-element">
                <label htmlFor="phone">{language.user.phone}</label>
                <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} id="phone" />
            </div>
            <div className="form-element">
                <label htmlFor="img">{language.user.img}</label>
                <input type="file" onChange={(event) => setImageFile(event.target.files)} id="img" />
            </div>
            <div className="form-element">
                <label htmlFor="admin">{language.user.admin}</label>
                <input type="checkbox" onChange={() => setAdmin(!admin)} id="admin" />
            </div>
            <div className="submit">
                <button className="register-btn" onClick={(e) => HandleLogin(e)}>{language.register}</button> 
            </div>
        </div>
    )
}

const mapStateToProps = (state: IReduxState) => {
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(Register);
