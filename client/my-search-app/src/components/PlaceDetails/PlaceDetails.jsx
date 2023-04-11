import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/no_place_found.jpg";
import "./PlaceDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context..js'

import VehicleService from './../services/VehicleService.js';



const URL = "https://openlibrary.org/works/";

const PlaceDetails = () => {
  const { loading, resultVehicle, setResultVehicle, vehicleService, vehicles, setLoading, setVehicles} = useGlobalContext();
  
  
  
  const navigate = useNavigate();
  const {id} = useParams();
  
  
  const [place, setPlace] = useState(null);
  

  const [comment, setComment] = useState('');

  //need to call an api from id:
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await VehicleService.sendComment(vehicles[0].id, comment);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    setLoading(true);
    async function getPlaceDetails(){
      try{
        const response = await VehicleService.getVehicleById(id);
        console.log("response in PlaceDetails");
        console.log(response.data.data.information);
        console.log(response.data.data.image)
        // const data = await response.json();
        // console.log(data);
        const docs = response.data.data.information;
        let img =response.data.data.image;
        const imgString = `data:image/png;base64,${response.data.data.image}`

        

        if(docs){
          const newVehicles = {
            image:imgString,
            id: docs._id,
            vin: docs.VIN,
            County: docs.County,
            City: docs.City,
            State: docs.State,
            PostalCode: docs.PostalCode,
            ModelYear: docs.ModelYear, 
            Make: docs.Make,
            Model: docs.Model,
            ElectricVehicleType: docs.ElectricVehicleType,
            CleanAlternativeFuelVehicleEligibility: docs.CleanAlternativeFuelVehicleEligibility,
            ElectricRange: docs.ElectricRange,
            BaseMSRP: docs.BaseMSRP,
            DOLVehicleID: docs.DOLVehicleID,
            Longitude: docs.Longitude,
            Latitude: docs.Latitude,
            ElectricUtility: docs.ElectricUtility,
          }
          

          setVehicles(newVehicles);
          console.log("newVehicles")
          //why am I getting this undefined? solve it
          console.log(vehicles[0].id)

          if(newVehicles.length > 1){
              setResultVehicle("Your Search Result");
          } else {
              setResultVehicle("No Search Result Found!")
          }
      }else {
        setVehicles([]);
        setResultVehicle("No Search Result Found!");
    }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getPlaceDetails();
  }, [id]);

  if(loading) return <Loading />;

  return (
    <section className='place-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/place")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='place-details-content grid'>
          <div className='place-details-img'>
            <img src = {vehicles.image?.coverImg} alt = "cover img" />
          </div>
          <div className='place-details-info'>
          <div className='place-details-item title'>
              <span className='fw-6 fs-24'>{vehicles.Make} {vehicles.Model}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 s-18'>VIN: </span>
              <span className='fs-18'>{vehicles.vin} </span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>Description:</span>
              <span className='fs-18'> {vehicles.Make} {vehicles.Model}</span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 s-18'>Location:</span>
              <span className='fs-18'> {vehicles.County}, {vehicles.City}, {vehicles.State} {vehicles.PostalCode}</span>
            </div>
           
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>ElectricRange:</span>
              <span className='fs-18'> {vehicles.ElectricRange} </span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>ModelYear:</span>
              <span className='fs-18'> {vehicles.ModelYear} </span>
            </div>
            <div className='place-details-item'>
              <span className='fw-6 fs-18'>Electric vehicles Type:</span>
              <span className='fs-18'> {vehicles.ElectricVehicleType} </span>
            </div>
            <div className='search-form'>
              <div className='container'>
                <div className='search-form-content'>
                  <form className='search-form' onSubmit={handleSubmit}>
                    <div className='search-form-elem flex flex-sb bg-white'>
                      <input type = "text" className='form-control' placeholder='Enter Comments...' />
                      <button type = "submit" className='flex flex-c' onSubmit={handleSubmit} >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
           </div>
          </div>
        </div>
      </div>
    </section>
  )
  
}

export default PlaceDetails