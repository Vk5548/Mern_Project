import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context.';
import Place from './Place';

import Loading from "../Loader/Loader";
import coverImg from "../../images/no_place_found.jpg";
import "./PlaceList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const PlaceList = () => {

  const {vehicles, loading, resultVehicle, setResultVehicle, vehicleService} = useGlobalContext();

  const searchVehicle = async (searchText) => {
    try {
      const response = await vehicleService.getVehicleByText(searchText);
      setResultVehicle(response.data.data); // assuming the result is present in the 'data' property of the response
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchVehicle("search text"); // pass your search text here
  }, []);

  const vehiclesWithCovers = vehicles.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if(loading) return <Loading />;

  return (
    <section className='placelist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultVehicle}</h2>
        </div>
        <div className='placelist-content grid'>
          {
            vehiclesWithCovers.slice(0, 4).map((item, index) => {
              return (
                <Place key={index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default PlaceList;
