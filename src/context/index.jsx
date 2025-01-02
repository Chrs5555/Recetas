import { createContext, useEffect, useState } from "react";


const RecipeContext = createContext();

function RecipeProvider({children}){



    //get recetas
    const [meals, setMeals] = useState([]);
    
    //buscador de recetas
    const [searchValue, setSearchValue] = useState("");

    //buscador filtrado
    const [filteredMeal, setFilteredMeal] = useState(meals)

    //lista de recetas favoritas
    const [favoritesMeal, setFavoritesMeal] = useState(() =>{
        const savedFavorites = localStorage.getItem("favoritesMeal")
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    //detalles recetas
    const [recipe, setRecipe] = useState(null)

    //manejo de la carga
    const [loading, setLoading] = useState(true)

    //shoping list
    const [shoppingList, setShoppingList] = useState(()=>{
        const savedShoppingList = localStorage.getItem("shoppingList")
        return savedShoppingList ? JSON.parse(savedShoppingList) : [];
    })

    const addIngredient = (ingredients) => {
        // Combina ingredientes existentes y nuevos sin duplicados
        const updatedList = [...new Set([...shoppingList, ...ingredients])];
        setShoppingList(updatedList);
        localStorage.setItem("shoppingList", JSON.stringify(updatedList)); // Guarda en localStorage
    };

    const removeIngredient = (ingredient) => {
        const updatedList = shoppingList.filter((item) => item !== ingredient)
        setShoppingList(updatedList)
        localStorage.setItem("shoppingList", JSON.stringify(updatedList))
        
    }


    const handleSearch = (searchValue) =>{

        if(!searchValue.trim()){
            setFilteredMeal(meals);
            return
        }

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then((response) => response.json())
            .then((data) =>{
                const result = data.meals || [];
                setFilteredMeal(result);
            })
            .catch((error) => console.error("Error al buscar recetas:", error));
    }

    const addFavorites = (meal) => {
        if(!favoritesMeal.some((fav) => fav.idMeal === meal.idMeal)){
            const updatedFavorites = [...favoritesMeal, meal];
            setFavoritesMeal(updatedFavorites);
            localStorage.setItem("favoritesMeal", JSON.stringify(updatedFavorites))
        }
    }

    const removeFavorites = (idMeal) => {
        const updateFavorites = favoritesMeal.filter((fav) => fav.idMeal !== idMeal);
        setFavoritesMeal(updateFavorites);
        localStorage.setItem("favoritesMeal", JSON.stringify(updateFavorites));
    }


    useEffect(() =>{

        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
            .then(response => response.json())
            .then(data => {
                console.log("API:", data);
                setMeals(data.meals || []); 
                setFilteredMeal(data.meals || [])
            })
    },[])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoritesMeal")) || [];
        setFavoritesMeal(storedFavorites); // Inicializa los favoritos desde localStorage
    }, []);
    
    const values = {
        meals,
        setMeals,
        searchValue,
        setSearchValue,
        filteredMeal,
        setFilteredMeal,
        handleSearch,
        recipe,
        setRecipe,
        loading,
        setLoading,
        favoritesMeal,
        setFavoritesMeal,
        addFavorites,
        removeFavorites,
        shoppingList,
        setShoppingList,
        addIngredient,
        removeIngredient,
        
    }

    return (
        <RecipeContext.Provider value={values}>
            {children}
        </RecipeContext.Provider>
    )
}

export {RecipeContext, RecipeProvider};