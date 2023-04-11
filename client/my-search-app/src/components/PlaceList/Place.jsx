import React from 'react';
import { Link } from 'react-router-dom';
import "./PlaceList.css";

import coverImg from "../../images/no_place_found.jpg";

const Place = (place) => {
  console.log("----ID to be sent----- "+place.id)
  const vehicle = [{vin: '5YJ3E1EA8K',
  Make: 'TESLA',
  Model: 'MODEL 3',
  ModelYear: 2019,
  }];
  return (
    <div className='place-item flex flex-column flex-sb'>
      <div className='place-item-img'>
        <img src = {coverImg} alt = "cover" />
      </div>
      <div className='place-item-info text-center'>
        {/* <Link to={{ pathname: `/place/${place.id}`, state: { place } }}>
          <div className='place-item-info-item title fw-7 fs-18'>
            <span>{place.Make} {place.Model}</span>
          </div>
        </Link> */}
        <Link to = {`/place/${place.id}`} >
          <div className='place-item-info-item title fw-7 fs-18'>
            <span>{place.Make} {place.Model}</span>
          </div>
        </Link>

        <div className='place-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Vehicle: </span>
          <span>{place.Make} {place.Model}</span>
        </div>

        <div className='place-item-info-item edition-count fs-15'>
          <span className='text-capitalize fw-7'>VIN: </span>
          <span>{place.vin}</span>
        </div>

        <div className='place-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>First Publish Year: </span>
          <span>{place.ModelYear}</span>
        </div>
      </div>
    </div>
  )
}

export default Place