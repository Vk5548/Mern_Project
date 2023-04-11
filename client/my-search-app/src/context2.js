import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
import VehicleService from './components/services/VehicleService';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [vehicles, setVehicles] = useState([]); //all the result here
    const [loading, setLoading] = useState(true);
    const [resultVehicle, setResultVehicle] = useState("");

    const fetchPlaces = useCallback(async() => {
        setLoading(true);
        try{
            const response = await VehicleService.getVehicleByText(searchTerm)
            const docs = response.data.information;
            console.log("type docs:"  )
            console.log(typeof docs)
            console.log("OUTPUT 3:34\n"+ docs)

            if(docs){
                const newBooks = docs.slice(0, 20).map((bookSingle) => {
                    const {key, author_name, cover_i, edition_count, first_publish_year, title} = bookSingle;

                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title
                    }
                });

                setVehicles(newBooks);

                if(newBooks.length > 1){
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
            loading, vehicles, setSearchTerm, resultVehicle, setResultVehicle, setVehicles,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};
