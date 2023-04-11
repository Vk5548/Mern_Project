import React, { useState } from "react";

//importing components 
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import SearchFormLocation from "../SearchForm/SearchFormLocation";


//importing css
import "./Header.css";


const Header = () => {
    const [showSearchForm, setShowSearchForm] = useState(true);

    const toggleComponent = () => {
        console.log(showSearchForm)
        setShowSearchForm(!showSearchForm);
      };

    return(
        <div className="holder">
            <header className="header"></header>
            <Navbar />
            <div className="header-content flex flex-center text-center text-white">
                <h2 className="header-title text-capitalize">
                    find vehicles:
                </h2><br />
                <p className="header-text fs-18 fw-3">gibberish gibberish gibberish g
                ibberish gibberish gibberish 
                gibberish gibberish gibberish 
                gibberish gibberish gibberish</p>
                {/* <SearchForm /> */}
                
                {showSearchForm ? <SearchForm /> : <SearchFormLocation />}
                {/* <Button text='Switch to a different search form'  onClick = {toggleComponent}/> */}
                <button onClick={toggleComponent} className="button-46">Switch to a different search form</button>
            </div>
        </div>
    );
}

export default Header;