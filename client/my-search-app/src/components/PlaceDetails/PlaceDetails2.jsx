import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loader/Loader';
import coverImg from '../../images/no_place_found.jpg';
import './PlaceDetails.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const URL = '/api/places/';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getPlaceDetails() {
      try {
        const response = await fetch(`${URL}${id}`);
        const data = await response.json();
        console.log(data);

        if (data) {
          const {
            _id,
            vin,
            County,
            City,
            State,
            PostalCode,
            ModelYear,
            Make,
            Model,
            ElectricVehicleType,
            CleanAlternativeFuelVehicleEligibility,
            ElectricRange,
            BaseMSRP,
            LegislativeDistrict,
            DOLVehicleID,
            Longitude,
            Latitude,
            ElectricUtility,
            CensusTract,
          } = data;
          const newplace = {
            VIN: vin,
            title: `${Make} ${Model}`,
            cover_img: coverImg,
            location: `${County}, ${City}, ${State} ${PostalCode}`,
            subject_times: '',
            subjects: `${ElectricVehicleType}, ${CleanAlternativeFuelVehicleEligibility}, Electric Range: ${ElectricRange} miles, Base MSRP: ${BaseMSRP}, Legislative District: ${LegislativeDistrict}, DOL Vehicle ID: ${DOLVehicleID}, Electric Utility: ${ElectricUtility}, Census Tract: ${CensusTract}`,
          };
          setPlace(newplace);
        } else {
          setPlace(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getPlaceDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className='place-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate('/place')}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='place-details-content grid'>
          <div className='place-details-img'>
            <img src={place?.cover_img} alt='cover img' />
          </div>
          <div className='place-details-info'>
            <div className='place-details-item title'>
              <span className='fw-6 fs-24'>{place?.title}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 s-18'>Location:</span>
              <span className='fs-18'>{place?.location}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>Description:</span>
              <span className='fs-18'>{place?.description}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>Price:</span>
              <span className='fs-18'>{place?.price}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>Rating:</span>
              <span className='fs-18'>{place?.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function PlaceDetails() {
const { id } = useParams();
const [place, setPlace] = useState(null);

useEffect(() => {
const getPlace = async () => {
const res = await fetch(/api/places/${id});
const data = await res.json();
setPlace(data);
};
getPlace();
}, [id]);

return (
<Layout>
{place ? (
<PlaceDetailsContent place={place} />
) : (
<div className='flex flex-c'>
<FaSpinner size={64} className='spin' />
<span className='fs-24'>Loading...</span>
</div>
)}
</Layout>
);
}



<div className='place-details-item title'>
              <span className='fw-6 fs-24'>{place?.title}</span>
            </div>
            <div className='place-details-item description'>
              <span>{place?.description}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{place?.subject_places}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{place?.subject_times}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{place?.subjects}</span>
            </div>
            
            <div className='place-details-item'>
              <span className='fw-6'>Comments: </span>
              <span>{place?.subject_places}</span>
            </div>



const handleSubmit = async (e) => {
  //preventing its default behavior
  e.preventDefault();

  //re-setting/setting the search term
  let tempSearchTerm = searchText.current.value.trim();
  if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
    setSearchTerm("Search Vehicles");
    setResultVehicle("Please Enter Something ...");
  } else {
    setSearchTerm(searchText.current.value); // entering the searchText to the val entered by the user
    try {
      const response = await VehicleService.searchVehicles(searchText.current.value); // call the axios to send the string
      setResultVehicle(response.data);
    } catch (error) {
      setResultVehicle(error.response.data);
    }
  }

  navigate("/place");
};
