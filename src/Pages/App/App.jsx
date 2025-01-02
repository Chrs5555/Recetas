
import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { RecipeProvider } from '../../context'
import Home from '../Home'
import Navbar from '../../Components/Navbar'
import Details from '../../Components/Detalles'
import Favoritos from '../../Components/Favoritos'
import ListaIngredientes from '../../Components/ListaDeIngredientes'
import Footer from '../../Components/Footer'


const AppRoutes = () =>{
  let routes = useRoutes([
    { path: '/',           element: <Home/>},
    { path: '/inicio',     element: <Home/>},
    { path: '/recipe/:id', element: <Details/>},
    { path: '/favoritos',  element: <Favoritos/>},
    { path: '/lista',      element: <ListaIngredientes/>},
    
  ])

  return routes;
}


function App() {

  return (
    <RecipeProvider>
      <BrowserRouter>
        <Navbar/>
        <AppRoutes/>
        <Footer/>
      </BrowserRouter>
    </RecipeProvider>
  )
}

export default App
