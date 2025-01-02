import { StarIcon } from '@heroicons/react/24/solid'
import React, { useContext } from 'react'
import { RecipeContext } from '../../context'
import './style.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const context = useContext(RecipeContext)
  const navigate = useNavigate(); 

  return (
    <div>

        
        <h1 className='pacific text-7xl text-center text-green-700 mt-10'>¿Que vamos a <br /> comer hoy?
        <span className='text-green-400'>...</span></h1>
        <h2 className='pacific text-xl font-bold text-left ml-40 my-9' >RECOMENDACIONES:</h2>
        

        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg m-auto'>
          {context.filteredMeal.length > 0 ? (
              context.filteredMeal.map(meal =>(
                <div key={meal.idMeal} onClick={() => navigate(`/recipe/${meal.idMeal}`)} className="cursor-pointer hover:bg-green-500 rounded-lg shadow-lg">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <div className='flex justify-between mx-3 my-3'>
                      <h2 className='text-lg font-bold text-center'>{meal.strMeal}</h2>
                       <StarIcon onClick={(event) =>{
                        event.stopPropagation(); 
                        context.addFavorites(meal)}}
                        className={`h-8 w-7 ${context.favoritesMeal.some(fav => fav.idMeal === meal.idMeal) 
                          ? 'text-yellow-400' 
                          : 'text-gray-500 hover:text-yellow-400'}`}/>
                    </div>
                    
                </div>
              ))
          ) : (
            <p>No se encontraron recetas disponibles</p>
          )}
          
        </div>
    </div>
  )
}

export default Home