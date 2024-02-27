import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import World from './pages/World';
import Business from './pages/Business';
import Entertainment from './pages/Entertainment';
import Technology from './pages/Technology';
import Sports from './pages/Sports';
import Lifestyle from './pages/Lifestyle';
import Opinion from './pages/Opinion';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/world' element={<World/>}/>
        <Route path='/business' element={<Business/>}/>
        <Route path='/entertainment' element={<Entertainment/>}/>
        <Route path='/technology' element={<Technology/>}/>
        <Route path='/sports' element={<Sports/>}/>
        <Route path='/lifestyle' element={<Lifestyle/>}/>
        <Route path='/opinion' element={<Opinion/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
