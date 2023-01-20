import { connect } from "react-redux";
import { useState, useEffect } from "react";
import vi from "../languages/vi.json";
import en from "../languages/en.json";
import "../styles/NewProduct.scss";
import IReduxState from "../redux/ReduxState";
import axios from "axios";
import { storage } from "../firebase";
import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
// require("dotenv").config();

interface ICardDetail {
    name: string;
    brand: string;
    price: number;
    color: string;
    description: string;
    image: string;
}

const NewProduct = (props: any) => {
    let [language, setLanguage] = useState(en);
    let [card, setCard] = useState<ICardDetail>({ name: "", brand: "", price: 0, color: "", description:"", image: "" });
    const [image, setImage] = useState<FileList | null>();
    
    useEffect(() => {
        props.language ? setLanguage(vi) : setLanguage(en);
    }, [props.language])
    
    const OnClickNewProduct = async () => {
        if (image) {
            let image_ref:StorageReference = ref(storage, `/images/${image[0].name + v4()}`);
            await uploadBytes(image_ref, image[0]).then(async (res) => {
                await getDownloadURL(res.ref).then((url) => {
                    card.image = url;
                    console.log(card);
                }).catch((err) => {
                    toast.error(language.error.img);
                    console.log(err);
                });
            });
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/product`, {
            "user": {
                "username": props.username,
                "role": props.role,
                "token": props.token
            },
            "product": {
                "name": card.name,
                "brand": card.brand,
                "price": card.price,
                "color": card.color,
                "description": card.description,
                "image": card.image
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            }
        }).then(res => {
            console.log(res);
            setCard({ name: "", brand: "", price: 0, color: "", description:"", image: "" });
            toast.success(language.success.insert);
        }).catch(err => {
            toast.error(language.error.insert);
            console.log(err);
        });
    }
    return (
        <div className="card-new">
            <p>{language.addproduct}</p>
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
            <div className="form-element">
                <p>{language.card.description}</p>
                <input type="text" value={card?.description} 
                onChange={(e) => setCard({...card, description: e.target.value} as ICardDetail )} />
            </div>
            <div className="form-element">
                <p>{language.card.img}</p>
                <input type="file" 
                onChange={(e) => {setImage(e.target.files)} } />
            </div>
            <div className="control" onClick={() => OnClickNewProduct()}>
                <button className="add">{language.addproduct}</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: IReduxState) => {
    return {
        language: state.language,
        username: state.username,
        role: state.role,
        token: state.token,        
    };
}

export default connect(mapStateToProps)(NewProduct);
