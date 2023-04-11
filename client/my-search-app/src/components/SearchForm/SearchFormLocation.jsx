import React, { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.";
import VehicleService from "../services/VehicleService";

import "./SearchFormLocation.css";

const SearchFormLocation = () => {
  const { setSearchTerm, setResultTitle, setResultVehicle, setVehicles } = useGlobalContext();
  const latitude = useRef("");
  const longitude = useRef("");
  const range = useRef("");
  const navigate = useNavigate();

  useEffect(() => latitude.current.focus(), []);
  useEffect(() => longitude.current.focus(), []);
  useEffect(() => range.current.focus(), []);

  const handleSubmit = async (e) => {
    //prevents any default submit behavior
    e.preventDefault();
  
    const tempLatitude = latitude.current.value.trim();
    console.log("tempLatitude"+tempLatitude)
    
    const tempLongitude = longitude.current.value.trim();
    const tempDistance = range.current.value.trim();
    console.log("tempLongitude"+tempLongitude)
    console.log("tempDistance"+tempDistance)
  
    if (
      (tempLatitude.replace(/[^\w\s]/gi, "")).length === 0 ||
      (tempLongitude.replace(/[^\w\s]/gi, "")).length === 0 ||
      (tempDistance.replace(/[^\w\s]/gi, "")).length === 0
    ) {
      setSearchTerm("vehicles...");
      setResultTitle("Please Enter Something ...");
    } else {
      try {
        const response = await VehicleService.getVehiclesByLocation(
           tempLatitude,
          tempLongitude,
          tempDistance
        );

        console.log("response getVehiclesByLocation")
        console.log(response)
        console.log(response.data.data.information)
        // console.log(response.data.information)
        // setVehicles(response.data.data.information);
        setResultVehicle("Your Results");
        // setSearchTerm(latitude.current.value);
      } catch (error) {
        console.error(error);
        setResultVehicle("Error searching for vehicles");
      }
    }
  
    navigate("/place");
  };
  
  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem">
              <input
                type="text"
                className="form-control"
                placeholder="Latitude ..."
                ref={latitude}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Longitude ..."
                ref={longitude}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Max. Dist..."
                ref={range}
              />
              <button type="submit" className="button" onClick={handleSubmit}>
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFormLocation;
