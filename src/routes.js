import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Todo from './pages/Todo';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/todo/:id' element={ <Todo/> }/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    )
}

export default RoutesApp;