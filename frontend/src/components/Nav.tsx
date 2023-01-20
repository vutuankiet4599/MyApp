import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.scss";
import en from "../languages/en.json";
import vi from "../languages/vi.json";
import IReduxState from "../redux/ReduxState";
import { connect } from "react-redux";
import user from "../img/user.png";
import { toast } from "react-toastify";
const Navbar = (props: any) => {
    let [is_mobile, setis_mobile] = useState(false);
    let [language, setLanguage] = useState(en);
    useEffect(() => {
        props.language ? setLanguage(vi) : setLanguage(en);
    }, [props.language]);
    const HandleLogout = () => {
        props.logout();
        toast.success(language.success.logout);
    }
    return (
        <div className={is_mobile ? "topnav responsive" : "topnav"} id="myTopnav">  
            {
                props.username ? (
                    <NavLink to="/" className="left right"><img className="icon-user" src = {props.image !== "" ? props.image : user} alt={props.username} /> {props.username}</NavLink>
                ) : ""
            }
            <NavLink to="/">{language.home}</NavLink>
            <NavLink to="/new">{language.new}</NavLink>
            {
                !props.username? (
                    <NavLink className={props.is_mobile ? "left" : "right"} to="/login">{language.login}</NavLink>
                ) : ""
            }
            {
                !props.username? (
                    <NavLink className={props.is_mobile ? "left" : "right"} to="/register">{language.register}</NavLink>
                ) : ""
            }
            {
                props.username? (
                    <NavLink className="right" to="/" onClick={() => HandleLogout()}>{language.logout}</NavLink>
                ) : ""
            } 
            <span className="icon" onClick={() => setis_mobile(!is_mobile)}>
                <i className="fa fa-bars"></i>
            </span>
        </div>
    )
}

const mapStateToProps = (state: IReduxState) => {
    return {
        language: state.language,
        username: state.username,
        token: state.token,
        role: state.role,
        image: state.image
    };    
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
