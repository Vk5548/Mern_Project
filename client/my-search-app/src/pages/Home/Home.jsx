import React from "react";

//importing components
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';


const Home = () => {
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
}

export default Home;