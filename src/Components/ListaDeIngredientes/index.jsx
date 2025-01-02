import React, { useContext } from 'react';
import { RecipeContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import '../../Pages/Home/style.css';

const ListaIngredientes = () => {

    const context = useContext(RecipeContext)
    const navigate = useNavigate(); 

    const removeFromList = (ingredient) => {
        context.removeIngredient(ingredient)
    }

    const addToList = () => {
        const newIngredient = prompt('Ingresa un nuevo ingrediente')
        if(newIngredient){
            context.addIngredient(newIngredient)
        }
    }
    return (
        <div className='p-6 max-w-screen-lg m-auto'>
            <h1 className='pacific text-5xl font-bold mb-6 text-center'>Lista de compras</h1>
            <div className='grid grid-cols-1 sn:grid-cols-2 lg:grid-cols-3 gap-6'>
                {context.shoppingList.length > 0 ? (
                    context.shoppingList.map((ingredient, index) => (
                        <div key={index} className='border mt-8 rounded-lg p-4 shadow-md'>
                            <p className='text-lg font-bold mb-2'>{ingredient}</p>
                            <button 
                             onClick={() => removeFromList(ingredient)}                                       
                             className='bg-red-500 text-white px-4 py-2 rounded-md'>
                             Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='text-center mt-10 col-span-3'>No hay ingredientes en la lista</p>
                )}
            </div>
            <div className='mt-24 flex justify-center gap-3'>
                <button 
                    onClick={addToList}
                    className='bg-gray-500 text-white px-4 py-2 rounded-md'>
                    Añair Ingrediente    
                </button>    
                <button 
                    onClick={() => navigate('/inicio')}
                    className='bg-green-500 text-white px-4 py-2 rounded-md'>
                    Regresar al inicio    
                </button>    
            </div>      
        </div>
    );
};

export default ListaIngredientes;

