import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", backendUrl);

    
    // Rename the state variable 'doctors' to avoid conflict with the import
    const [doctorsList, setDoctorsList] = useState([]);
    const [token, setToken] = useState('');

    // Function to get doctors data
    const getDoctors = async () => {
        try {
             const { data } = await axios.get(`${backendUrl}/api/doctors/list`);
        

            if (data.success) {
                setDoctorsList(data.doctors);  // Set the doctors data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Correctly calling getDoctors inside useEffect
    const value = {
        doctorsList,    // Changed the variable name to doctorsList to avoid conflict
        currencySymbol,
        token,
        setToken,
        backendUrl
    };
    useEffect(() => {
        console.log("Fetching doctors on mount..."); 
        getDoctors();
        
    }, []);  // Empty dependency array means this runs only once, on component mount

    // Passing the value to the provider

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
