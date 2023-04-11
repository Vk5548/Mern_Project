import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // add curly braces here
// import App from './App';

import './index.css';


//import pages
import About from '../src/pages/About/About';
import Home from '../src/pages/Home/Home';
import PlaceList from './components/PlaceList/PlaceList';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import { AppProvider, useGlobalContext } from './context.'; // so as to use similar cvaribales in multiple components

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter> 
      <Routes>
        <Route path = "/" element= {<Home />}> 
          <Route path='about' element = {<About/>} />
          <Route path = "/place/" element={<PlaceList />}/>
          <Route path = "/place/:id" element={<PlaceDetails />}/>
        </Route>
      </Routes>
   </BrowserRouter>
  </AppProvider>
   
  
);

