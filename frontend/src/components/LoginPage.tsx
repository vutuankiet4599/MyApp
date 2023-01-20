import en from "../languages/en.json";
import vi from "../languages/vi.json";
import "../styles/Login.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import IReduxState from "../redux/ReduxState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// require("dotenv").config();

const LoginPage = (props: any) => {
     let navigate = useNavigate();

     let [language, setLanguage] = useState(en);
     let [username, setUsername] = useState<string>("");
     let [password, setPassword] = useState<string>("");
     
     useEffect(() => {
          props.language ? setLanguage(vi) : setLanguage(en);
     }, [props.language]);

     useEffect(() => {          
          if (props.username !== "") {
               navigate("/");
          }
     });

     let HandleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
          if (username && password) {
               axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/login`, {
                    username: username,
                    password: password
               },{
                    headers: {
                         'Content-Type': 'application/json'
                    }
               })
               .then((res)=> {
                    let { role, token, image } = res.data;
                    props.login(username, token, role, image);
                    toast.success(language.success.login);
                    navigate("/");
               })
               .catch((err)=> {
                    toast.error(language.error.login);
                    console.log(err);
               });
          }
     }

     return (
          <div className="login-page">
               <p>{language.loginpage}</p>
               <div className="username">
                    <label htmlFor="username">{language.user.username}</label>
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} id="username" />
               </div>
               <div className="password">
                    <label htmlFor="password">{language.user.password}</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" />
               </div>
               <div className="submit">
                    <button className="login-btn" onClick={(e) => HandleLogin(e)}>{language.login}</button> 
               </div>
          </div>
     )
}

const mapDispatchToProps = (dispatch: any) => {
     return {
         login: (username: string, token: string, role: number, image:string) => dispatch({ type: 'LOGIN', payload: { username, token, role, image } })
     }
}

const mapStateToProps = (state: IReduxState) => {
     return {
          language: state.language,
          username: state.username,
          role: state.role,
          token: state.token
     };    
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)