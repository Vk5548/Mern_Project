import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
import VehicleService from './components/services/VehicleService';

const AppContext = React.createContext();


const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [latSearch, setLatSearch] = useState("");
    const [vehicles, setVehicles] = useState([]); //all the result here
    const [loading, setLoading] = useState(true);
    const [resultVehicle, setResultVehicle] = useState("");

    const fetchPlaces = useCallback(async() => {
        setLoading(true);
        try{
            // const response = await fetch(`${URL}${searchTerm}`);
            //call here Vehicle Service
            //How do I know what type of data is returned?
            const response = await VehicleService.getVehicleByText(searchTerm)
            console.log("response");
            console.log(response);
            //line below has the error
            // const data = await response.json();
            const docs = response.data.data.information;
            
            console.log("type docs:"  )
            console.log(typeof docs)
            console.log("OUTPUT 3:34\n"+ docs[0])
            console.log("docs")
            console.log(docs)

            if(docs){
                const newVehicles = docs.map((vehicle) => {
                    const {_id, BaseMSRP, City, CleanAlternativeFuelVehicleEligibility, County, DOLVehicleID,
                        ElectricRange, ElectricUtility,
                        ElectricVehicleType, Latitude, Longitude, Make,
                        Model, ModelYear, PostalCode, State, VIN} = vehicle;

                    return {
                        id: _id,
                        vin: VIN,
                        County: County,
                        City: City,
                        State: State,
                        PostalCode: PostalCode,
                        ModelYear: ModelYear,
                        Make: Make,
                        Model: Model,
                        ElectricVehicleType: ElectricVehicleType,
                        CleanAlternativeFuelVehicleEligibility: CleanAlternativeFuelVehicleEligibility,
                        ElectricRange: ElectricRange,
                        BaseMSRP: BaseMSRP,
                        DOLVehicleID: DOLVehicleID,
                        Longitude: Longitude,
                        Latitude: Latitude,
                        ElectricUtility: ElectricUtility,
                    }
                });

                setVehicles(newVehicles);
                console.log("newVehicles")
                console.log(newVehicles)

                if(newVehicles.length > 1){
                    setResultVehicle("Your Search Result");
                } else {
                    setResultVehicle("No Search Result Found!")
                }
            } else {
                setVehicles([]);
                setResultVehicle("No Search Result Found!");
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchPlaces();
    }, [searchTerm, fetchPlaces]);

    return (
        <AppContext.Provider value = {{
            loading, vehicles, setSearchTerm, resultVehicle, setResultVehicle, setVehicles, setLoading, latSearch, setLatSearch,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};