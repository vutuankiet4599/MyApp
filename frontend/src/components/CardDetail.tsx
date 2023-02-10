import { connect } from "react-redux";
import IReduxState from "../redux/ReduxState";
import "../styles/CardDetail.scss";
import { useState, useEffect } from "react";
import vi from "../languages/vi.json";
import en from "../languages/en.json";
import Loader from "./Loader";
import product from "../img/product.png";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

interface ICardDetail {
    id: number;
    name: string;
    brand: string;
    price: number;
    color: string;
    description: string;
    image: string;
    updatedAt: string;
}

const CardDetail = (props: any) => {
    let [language, setLanguage] = useState(en);
    let [is_loading, setIsLoading] = useState<boolean>(true);
    let [card, setCard] = useState<ICardDetail>();
    let [is_update, setIsUpdate] = useState<boolean>(false);
    let params = useParams();
    let navigate:NavigateFunction = useNavigate();

    useEffect(() => {
        axios.get<ICardDetail>(`http://localhost:5000/api/v1/product/${params["id"]}`)
        .then((res) => {
            let data: ICardDetail = Object.values(res.data)[2];
            data.color = data.color ? data.color : "";
            data.description = data.description? data.description : "";
            data.image = data.image? data.image : "";
            setCard(data);
        })
    }, []);

    useEffect(() => {
        props.language ? setLanguage(vi) : setLanguage(en);
    }, [props.language]);

    useEffect(() => {
        if (card) {
            setIsLoading(false);
        }else {
            setIsLoading(true);
        }
    }, [card])

    const HandleDeleteProduct = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/product-delete`, {
            "user": {
                "username": props.username,
                "role": props.role,
                "token": props.token
            },
            "id_product": params["id"]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            }
        }).then(res => {
            console.log(res);
            toast.success(language.success.delete);
            navigate("/");
        }).catch(err => {
            toast.error(language.error.delete);
            console.log(err);
        });        
    }

    const HandleUpdateProduct = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_URI}/api/v1/product`, {
            "user": {
                "username": props.username,
                "role": props.role,
                "token": props.token
            },
            "product": {
                "id": params["id"],
                "name": card?.name,
                "description": card?.description,
                "image": card?.image,
                "brand": card?.brand,
                "color": card?.color,
                "price": card?.price
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            }
        }).then(res => {
            console.log(res);
            toast.success(language.success.update);
            navigate("/");
        }).catch(err => {
            toast.error(language.error.update);
            console.log(err);
        });
    }
    return (
        <div>
            {
                is_loading ? (
                    <Loader />
                ) : (
                    <>
                        {
                            !is_update ? (
                                <div className="card-detail">
                                    <div className="image">
                                        <img src={card?.image ? card.image : product} alt={card?.name} />
                                    </div>
                                    <div className="content">
                                        <div className="name">
                                            <p>{language.card.name}: {card?.name}</p>
                                        </div>
                                        <div className="brand">
                                            <p>{language.card.brand}: {card?.brand}</p>
                                        </div>
                                        {
                                            card?.color && (
                                                <div className="color">
                                                    <p>{language.card.color}: {card?.color}</p>
                                                </div>
                                            )
                                        }
                                        <div className="price">
                                            <p>{language.card.price}: {card?.price}</p>
                                        </div>
                                        {
                                            card?.description && (
                                                <div className="description">
                                                    <p>{language.card.description}: {card?.description}</p>
                                                </div>
                                            )
                                        }
                                        <div className="control">
                                            <button className="update" onClick={() => setIsUpdate(true)}>{language.updatecard}</button>
                                            <button className="delete" onClick={() => HandleDeleteProduct()}>{language.deletecard}</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="card-update">
                                    <p>{language.updatecard}</p>
                                    <div className="form-element">
                                        <p>{language.card.name}</p>
                                        <input type="text" value={card?.name} 
                                        onChange={(e) => setCard({...card, name: e.target.value} as ICardDetail )} />
                                    </div>
                                    <div className="form-element">
                                        <p>{language.card.brand}</p>
                                        <input type="text" value={card?.brand} 
                                        onChange={(e) => setCard({...card, brand: e.target.value} as ICardDetail )} />
                                    </div>
                                    <div className="form-element">
                                        <p>{language.card.color}</p>
                                        <input type="text" value={card?.color} 
                                        onChange={(e) => setCard({...card, color: e.target.value} as ICardDetail )} />
                                    </div>
                                    <div className="form-element">
                                        <p>{language.card.price}</p>
                                        <input type="number" value={card?.price} 
                                        onChange={(e) => setCard({...card, price: Number(e.target.value)} as ICardDetail )} />
                                    </div>
                                    <div className="form-element w-90">
                                        <p>{language.card.description}</p>
                                        <input type="text" value={card?.description} 
                                        onChange={(e) => setCard({...card, description: e.target.value} as ICardDetail )} />
                                    </div>
                                    <div className="control">
                                        <button className="edit" onClick={() => HandleUpdateProduct()}>{language.editproduct}</button>
                                        <button className="back" onClick={() => setIsUpdate(!is_update)}>{language.backtodetail}</button>
                                    </div>
                                </div>
                            )
                        }
                        
                    </>
                )
            }
        </div>
    )
}

const mapStateToProps = (state: IReduxState) => {
    return {
        language: state.language,
        username: state.username,
        role: state.role,
        token: state.token, 
    }
}

export default connect(mapStateToProps)(CardDetail);