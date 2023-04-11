import React from 'react';
import { useGlobalContext } from '../../context.';
import Place from './Place';

import Loading from "../Loader/Loader";
import coverImg from "../../images/no_place_found.jpg";
import "./PlaceList.css";
 

//https://covers.openlibrary.org/b/id/240727-S.jpg

const PlaceList = () => {
  
  const { loading, resultVehicle, setResultVehicle, vehicles} = useGlobalContext();
 

  console.log("vehicles in PLaceLIst")
  //why is it undefined
  console.log(vehicles);

  if(loading) return <Loading />;

  return (
    
    <section className='placelist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultVehicle}</h2>
        </div>
        <div className='placelist-content grid'>
            {vehicles.map ? (
                 vehicles.map((item, index) => (
                  <Place key={index} {...item} />
                  ))
             ) : (
                   <Place {...vehicles} />
    )}
        </div>
      </div>
    </section>
  )
}

export default PlaceList