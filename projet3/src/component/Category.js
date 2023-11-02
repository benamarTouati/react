import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

const Category = () => {
    const [cocktails, setCocktails] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchCocktailsByCategory = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`);
                const data = await response.json();
                setCocktails(data.drinks);
            } catch (error) {
                console.error("Erreur lors de la récupération des cocktails de la catégorie:", error);
            }
        };

        fetchCocktailsByCategory();
    }, [categoryName]);

    return (
        <div>
            <h1 className="cocktail-list-title">Cocktails de la catégorie: {categoryName}</h1>
            <div className="cocktail-list">
                {cocktails.map(cocktail => (
                    <div key={cocktail.idDrink} className="cocktail-item">
                        <img className="cocktail-image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                        <div className="cocktail-content">
                            <h3 className="cocktail-name">{cocktail.strDrink}</h3>
                        </div>
                        <div>
                            <Link className="cocktail-link" to={`/recipe/${cocktail.idDrink}`}>Voir la recette</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
