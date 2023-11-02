import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CocktailDetail = () => {
    const [cocktailDetail, setCocktailDetail] = useState(null);
    const { id } = useParams(); // Récupération de l'ID à partir de l'URL

    useEffect(() => {
        const fetchCocktailDetail = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur réseau: ${response.status}`);
                }
                const data = await response.json();
                setCocktailDetail(data.drinks[0]); // Stockage des détails du cocktail
            } catch (error) {
                console.error("Erreur lors de la récupération du détail du cocktail:", error);
            }
        };

        fetchCocktailDetail();
    }, [id]);

    // Fonction pour rassembler les ingrédients
    const getIngredients = (cocktail) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            if (cocktail[`strIngredient${i}`]) {
                ingredients.push(cocktail[`strIngredient${i}`]);
            } else {
                break;
            }
        }
        return ingredients;
    };

    if (!cocktailDetail) {
        return <div>Chargement...</div>;
    }

    const ingredients = getIngredients(cocktailDetail);

    return (
        <div className="cocktail-detail-container">
            <h1 className="cocktail-detail-title">{cocktailDetail.strDrink}</h1>
            <img className="cocktail-detail-image" src={cocktailDetail.strDrinkThumb} alt={cocktailDetail.strDrink} />
            <p className="cocktail-detail-description">{cocktailDetail.strInstructions}</p>
            <div className="cocktail-detail-ingredients">
                <h3>Ingrédients:</h3>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CocktailDetail;

