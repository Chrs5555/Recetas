import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Pages/Home/style.css';
import { RecipeContext } from '../../context';

const Details = () => {

    const context = useContext(RecipeContext);

    const { id } = useParams();
    const navigate = useNavigate();

    //ingredientes seleccionados
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((response) => response.json())
            .then((data) => {
                context.setRecipe(data.meals ? data.meals[0] : null);
                context.setLoading(false);
            })
            .catch((error) => {
                console.error('Error al cargar los detalles:', error);
                context.setLoading(false);
            });
    }, [id]);

    if (context.loading) return <p>Cargando detalles...</p>;
    if (!context.recipe) return <p>No se encontraron detalles para esta receta.</p>;

    // selección de ingredientes
    const toggleIngredient = (ingredient) => {
        const ingredientObject = {name: ingredient}
        setSelectedIngredients((prevSelected) => 
            prevSelected.some((item) => item.name === ingredient)
            ? prevSelected.filter((item) => item.name !== ingredient)
            : [...prevSelected, ingredientObject]
        );
    };

    // Agregar ingredientes
    const addToShoppingList = () => {
        context.addIngredient(selectedIngredients);
        setSelectedIngredients([]);
    };

    return (
        <div className='p-6 flex flex-col gap-7 justify-center max-w-screen-lg m-auto'>
            <div className='flex gap-7 m-auto'>
                <button
                    disabled={selectedIngredients.length === 0}
                    onClick={addToShoppingList}
                    className={`bg-green-500 text-white w-52 px-4 py-1 rounded-md  ${selectedIngredients.length === 0 && 'opacity-50 cursor-not-allowed'}`}>
                    Agregar a Lista de Compras
                </button>
                
                <button onClick={() => navigate('/')} className='bg-green-500 text-white px-4 py-1 rounded-md w-24  '>
                    Regresar
                </button>
            </div>
            
            <h1 className='pacific text-6xl font-semibold'>{context.recipe.strMeal}</h1>
            <div className='flex flex-row gap-20 '>
                <img src={context.recipe.strMealThumb} alt={context.recipe.strMeal} className="m-auto w-96 h-80 rounded-lg" />
                <div>
                    <h2 className='text-xl font-bold mb-6 text-center'>Ingredientes:</h2>
                    <ul className='flex flex-wrap gap-8'>
                        {Object.keys(context.recipe)
                            .filter((key) => key.startsWith('strIngredient') && context.recipe[key])
                            .map((key, index) => {
                                const ingredient = `${context.recipe[key]} - ${context.recipe[`strMeasure${key.slice(13)}`]}`;

                                return (
                                    <li key={index} className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                            checked={selectedIngredients.some((item) => item.name === ingredient)}
                                            onChange={() => toggleIngredient(ingredient)}
                                        />
                                        {ingredient}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            

            <h2 className='text-xl font-bold mt-4'>Instrucciones:</h2>
            <p className='text-justify'>{context.recipe.strInstructions}</p>
        </div>
    );
};

export default Details;
