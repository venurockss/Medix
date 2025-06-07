import { createContext ,useState,useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { getAllAppointments } from "../../../backend/controllers/userController";



export const AdminContext = createContext();

const AdminContextProvider =(props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/all-doctors`,
                { headers: { Authorization: `${aToken}` } }
            );
          
            if (data.success || data.sucess) {
                setDoctors(data.doctors);
                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while fetching doctors");
        }
    };
    
    const value = {
       aToken,setAToken,backendUrl,doctors,setDoctors,
       getAllDoctors
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;