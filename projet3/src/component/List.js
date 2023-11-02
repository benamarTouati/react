import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const List = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
                const data = await response.json();
                setCategories(data.drinks);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container-list">
            <h1>Types de Cocktails</h1>
            <div className="card-list-container">
                {categories.map((category, index) => (
                    <div key={index} className="card-list" onClick={() => navigate(`/list/${category.strCategory}`)}>
                        <div className="card-list-content">
                            <h2 className="card-list-title">{category.strCategory}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
