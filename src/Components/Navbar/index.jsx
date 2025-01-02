
import { NavLink } from 'react-router-dom'
import React from 'react'
import Search from '../Buscador'


const Navbar = () => {

    const activeStyle = 'underline underline-offset-4 text-green-700'

  return (
    
    <nav className='bg-slate-50 border-b border-gray-200 py-4 px-6  w-full  top-0'>
        <div className='container mx-auto flex justify-between items-center'>
            <div className='flex items-center '>
                <h1 className='text-2xl font-bold text-green-700'>
                    Recetas <br /><span className='font-light'>De Mamá</span>
                </h1>
            </div>

            <ul className='flex space-x-6 font-bold text-gray-600'>
                <li className='hover:text-green-700 cursor-pointer'>
                    <NavLink
                        className={({isActive}) => isActive ? activeStyle : undefined} 
                        to='/inicio'>Inicio</NavLink>
                </li>
                <li className='hover:text-green-700 cursor-pointer'>
                    <ul>Detalles de la receta</ul>
                </li>
                <li className='hover:text-green-700 cursor-pointer'>
                    <NavLink 
                        className={({isActive}) => isActive ? activeStyle : undefined}
                        to='lista'>Lista de compras</NavLink>
                </li>
            </ul>

            <Search/>

        </div>
        
    </nav>
  )
}

export default Navbar