import React, {useRef, useEffect} from 'react';
import {FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.';

import VehicleService from '../services/VehicleService';

import "./SearchForm.css";

const SearchForm = () => {
  const {setSearchTerm, setResultVehicle, } = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);


  const handleSubmit = async (e) => {
    //preventing its default behavior
    e.preventDefault();

    //re-setting/setting the search term
    let tempSearchTerm = searchText.current.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("Search Vehicles");
      setResultVehicle("Please Enter Something ...");
    } else {
      setSearchTerm(searchText.current.value); // entering the searchText to the val entered by the user
      //call the axios here to send the string
      try {
        const response = await VehicleService.getVehicleByText(searchText.current.value); // call the axios to send the string
        setResultVehicle("Your Results"); //resultVehicle contains the updated data
      } catch (error) {
        setResultVehicle(error.response.data);
      }
    }

    navigate("/place");
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input type = "text" className='form-control' placeholder='Vehicles ...' ref = {searchText} />
              <button type = "submit" className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-purple' size = {32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchForm