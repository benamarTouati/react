import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home  () {
    const [cocktails, setCocktails] = useState([]);

    // Définition de la fonction fetchCocktailsByLetter avec useCallback
    const fetchCocktailsByLetter = useCallback(async (letter) => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
            if (!response.ok) {
                throw new Error(`Erreur réseau: ${response.status}`);
            }
            const data = await response.json();
            return data.drinks; // Retourne les cocktails pour cette lettre
        } catch (error) {
            console.error("Erreur lors de la récupération des cocktails:", error);
        }
    }, []);

    // Définition de la fonction fetchAllCocktails avec useCallback
    const fetchAllCocktails = useCallback(async () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const allCocktails = [];

        for (const letter of alphabet) {
            const drinksByLetter = await fetchCocktailsByLetter(letter);
            if (drinksByLetter) {
                allCocktails.push(...drinksByLetter);
            }
        }

        setCocktails(allCocktails);
    }, [fetchCocktailsByLetter]);

    // Utilisation de useEffect pour appeler fetchAllCocktails au montage du composant
    useEffect(() => {
        fetchAllCocktails();
    }, [fetchAllCocktails]);

    // Fonction utilitaire pour tronquer le texte
    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <div>
            <h1 className="cocktail-title">Cocktails</h1>
            <div className="cocktail-categorie">
                <Link to="/list">Trier par catégorie</Link>
            </div>
            <div className="cocktail-list">
                {cocktails.map(cocktail => (
                    <div key={cocktail.idDrink} className="cocktail-item">
                        <img className="cocktail-image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                        <div className="cocktail-content">
                            <h3 className="cocktail-name">{cocktail.strDrink}</h3>
                            <p className="cocktail-description">{truncateText(cocktail.strInstructions, 100)}</p>
                            <div>
                                <Link className="cocktail-link" to={`/recipe/${cocktail.idDrink}`}>Voir la recette</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
