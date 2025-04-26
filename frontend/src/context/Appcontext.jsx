import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { toast } from "react-toastify";
import { use } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    

    
    // Rename the state variable 'doctors' to avoid conflict with the import
    const [doctorsList, setDoctorsList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData,setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: { line1: '', line2: '' },
        gender: '',
        dob: '',
        image: ''
      }); // State to store user data

    // Function to get doctors data
    const getDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {}, {
                headers: { atoken: token },
            });
           

            if (data.success) {
                setDoctorsList(data.doctors);  
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };


    const loadUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/users/get-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
           

            if (data.sucess) {
                
                setUserData(data.user); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
    
        if (storedToken && !token) {
            setToken(storedToken); // This will trigger useEffect again due to dependency [token]
        } else if (token) {
            console.log("Token found, fetching doctors...");
            getDoctors();
        } else {
            console.log("No token found, skipping fetch.");
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            console.log("Token found, loading user data...");
            loadUserData();
        } else {
            setUserData({
                name: '',
                email: '',
                phone: '',
                address: { line1: '', line2: '' },
                gender: '',
                dob: '',
                image: ''
              }); 
            console.log("No token found, skipping user data load.");
        }
    },[token])
    // Correctly calling getDoctors inside useEffect
    const value = {
        doctorsList,    // Changed the variable name to doctorsList to avoid conflict
        currencySymbol,
        token,
        setToken,
        backendUrl,
        getDoctors,
        userData,
        setUserData,
        loadUserData
    };
 // Dependency array includes token to refetch when it changes


  

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
