import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/solid'
import React, { useContext } from 'react'
import { RecipeContext } from '../../context'
import { useNavigate } from 'react-router-dom'

const Search = () => {

  const context = useContext(RecipeContext)
  const navigate = useNavigate();
 
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(context.searchValue.trim()){
        context.handleSearch();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className='flex items-center space-x-4'>
        <div className='relative'>
            <input type="text" 
                   placeholder='Buscar' 
                   value={context.searchValue}
                   onChange={(e) => {
                      const value = e.target.value;
                      context.setSearchValue(value);
                      context.handleSearch(value)
                   }}
                   className='border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500' />
            <button type='submit'>
                <MagnifyingGlassIcon className='absolute  w-5 h-6 right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-700'/>
            </button>
        </div>
        
        <button onClick={() => navigate("/favoritos")}>
          <HeartIcon className="text-gray-500 w-7 cursor-pointer h-8 hover:text-red-500"/>
        </button>
        
    </div>
    </form>
  )
}

export default Search