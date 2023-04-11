import axios from 'axios';

// const USER_API_BASE_URL = "http://10.181.91.156:81/";
const USER_API_BASE_URL = "https://1311-50-30-232-30.ngrok-free.app/";

class VehicleService {

    getVehicles(){
        return axios.get(USER_API_BASE_URL);
    }

    // createUser(user){
    //     return axios.post(USER_API_BASE_URL, user);
    // }

    

    getVehicleById(userId){
        console.log("USER_API_BASE_URL + ----- "+ USER_API_BASE_URL + userId)
        return axios.post(USER_API_BASE_URL + "filteredSearch", {
            id: userId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    submitComments(id, comments){
        console.log("D debug")
        console.log(id)
        return axios.post(USER_API_BASE_URL + "addComments", {
            id: id,
            comments: comments
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // getVehicleByText(searchText){
    //     console.log("USER_API_BASE_URL + '?attribute='+searchText--------"+USER_API_BASE_URL + '/?attribute='+searchText)
    //     return axios.post(USER_API_BASE_URL, {attribute: searchText});
    // }
    

    getVehicleByText(searchText){
        console.log("-------Called getVehicleByText" + searchText)
        return axios.post(USER_API_BASE_URL + "globalSearch", {
            evt: searchText
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getVehiclesByLocation(lat, long, dist) {
        console.log(USER_API_BASE_URL + "globalLocationSearch")
        return axios.post(USER_API_BASE_URL + "globalLocationSearch", {
          latitude: lat,
          longitude: long,
          range: dist
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    

    // updateUser(user, userId){
    //     return axios.put(USER_API_BASE_URL + '/' + userId, user);
    // }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new VehicleService()