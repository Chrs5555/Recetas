import React, { useContext } from 'react'
import '../../Pages/Home/style.css'
import { RecipeContext } from '../../context'
import { useNavigate } from 'react-router-dom'

const Favoritos = () => {

    const context = useContext(RecipeContext)
    const navigate = useNavigate();
    
    if(context.favoritesMeal.length === 0){
        return(
            <div className='p-6 flex flex-col items-center gap-5'>
                <h2 className='pacific text-5xl font-bold'>Aun no tienes recetas favoritas</h2>
                <button
                    onClick={() => navigate("/inicio")}
                    className='bg-green-500 rounded-md text-white mt-10 px-4 py-2'
                >Ir al Inicio</button>
            </div>
        );
    }

  return (

    <div className='p-6 max-w-screen-lg m-auto'>
        <h1 className='pacific text-4xl font-bold mb-6 text-center'>Mis recetas Favoritas</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {context.favoritesMeal.map((meal) => (
                <div key={meal.idMeal} className='border rounded-lg p-4 shadow-md'>
                    <img src={meal.strMealThumb} alt={meal.strMeal} 
                    className='w-full h-40 object-cover rounded-md mb-4' 
                    />
                    <h2 className='text-lg font-bold mb-2'>{meal.strMeal}</h2>

                    <button onClick={() => context.removeFavorites(meal.idMeal)} 
                    className='bg-red-500 text-white px-4 py-2 rounded-md'>
                        Eliminar de Favoritos
                    </button>
                </div>
            ))}
        </div>
        <button onClick={() => navigate("/inicio")} className='bg-green-500 text-white px-4 py-2 rounded-md mt-6'> 
            Volver a Inicio
        </button>
    </div>
  )
}

export default Favoritos