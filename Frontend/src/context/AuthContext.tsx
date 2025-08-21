import { createContext, useContext, useEffect, useState } from 'react';
import { Darja, Teacher } from '../types';
import { api } from '../api';


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}



export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(document.cookie || null)
    const [darja, setDarja] = useState<Darja[]>([])
    const [teacher, setTeacher] = useState<Teacher[]>([])

    const getDarja = async () => {
        try {
          const response = await api.get('/darja');
          setDarja(response.data);
        } catch (error) {
          console.error('Error fetching darja:', error);
        }
      };
    const getTeacher = async () => {
        try {
          const response = await api.get('/teacher');
          setTeacher(response.data);
        } catch (error) {
          console.error('Error fetching darja:', error);
        }
      };
    
      // Fetch darja data only on component mount
      useEffect(() => {
        getDarja();
        getTeacher();
      }, []);
    return <AuthContext.Provider value={{ authUser, setAuthUser, darja, teacher }}>
        {children}
    </AuthContext.Provider>
}

