import IReduxState from "../redux/ReduxState";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Card.scss";
import vi from "../languages/vi.json";
import en from "../languages/en.json";
import product from "../img/product.png";

const Card = (props: any) => {
    let [language, setLanguage] = useState(en);
    let navigate = useNavigate();

    useEffect(() => {
        props.language ? setLanguage(vi) : setLanguage(en);
    }, [props.language]);

    const RedirectToCardDetail = () => {
        navigate(`/card/${props.id}`);
    }

    return (
        <div className="card" onClick={() => RedirectToCardDetail()}>
            {props.image ? (
                <div className="card-image">
                    <img src={props.image} alt={props.name} />
                </div>
            ) : (
                <div className="card-image">
                    <img src={product} alt={props.name} />
                </div>
            )}
            <div className="card-content">
                <p>{language.card.name}: {props.name}</p>
            </div>
            <div className="card-brand">
                <p>{language.card.brand}: {props.brand}</p>
            </div>
            <div className="card-price">
                <p>{language.card.price}: {props.price}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state: IReduxState) => {
    return {
        language: state.language
    };    
}
export default connect(mapStateToProps)(Card);
