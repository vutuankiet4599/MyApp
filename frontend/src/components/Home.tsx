import React, { useEffect, useState } from 'react';
import Card from './Card';
import "../styles/Home.scss";
import Loader from "./Loader";
import axios from 'axios';
// require("dotenv").config();

interface ICard {
    id: number;
    name: string;
    brand: string;
    price: number;
    color?: string;
    description?: string;
    image?: string;
    updatedAt: string;
}

const Home = () => {
    let [cards, setCards] = useState<ICard[]>([]);
    let [is_loading, setIsLoading] = useState<boolean>(true);
    let [current_page, setCurrentPage] = useState<number>(1);

    let number_of_pages:number = Math.ceil(cards.length / 12);

    useEffect(() => {
        setIsLoading(true);
        axios.get<ICard>(`${process.env.REACT_APP_BACKEND_URI}/api/v1/product`)
        .then((res) => {
            let data: ICard[] = Object.values(res.data)[2];
            setCards(data);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if (cards.length === 0) {
            setIsLoading(true);
        }else {
            setIsLoading(false);
        }
    }, [cards])

    return (
        <div className="home">
            {
                is_loading === true ? (
                    <Loader />
                ) : (
                    <>
                        <div className="card-list">
                            {
                                cards.map((card, index) => {
                                    if (index >= (current_page - 1) * 12 && index < ((current_page - 1) * 12) + 12) {
                                        return (
                                            <Card
                                                key={card.id}
                                                id={card.id}
                                                name={card.name}
                                                brand={card.brand}
                                                price={card.price}
                                                image={card.image}
                                            />
                                        )
                                    }    
                                })
                            }
                        </div>
                        <div className="card-pages">
                            <form>
                                <input type="number" value={current_page} onChange={(event) => setCurrentPage(Number(event.target.value))} min={1} max={number_of_pages} />
                            </form>
                            <span>/ {number_of_pages}</span>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Home;