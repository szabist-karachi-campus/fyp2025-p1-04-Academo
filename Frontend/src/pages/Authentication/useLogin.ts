import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { api } from "../../api";
import toast from "react-hot-toast";

export const useLogin = () => {

    const [loading, setLoading] = useState(false)

    const { setAuthUser } = useAuthContext();
    
    const login = async ({username, password}) =>{
        try {
            setLoading(true)
            const res = await api.post('/auth/login', { username: username, password: password })
            const data = res.data;
    
            if (data.error) {
                throw new Error(data.error)
            }
    
            document.cookie = `chat-app=${JSON.stringify({
                userID: data._id,
                username: data.username,
                role: data.role,
            })}; expires=${new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`
            setAuthUser('data._id')
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error || "An error occurred");
    
            }
            else if (error.request) {
                console.log(error.request);
                toast.error("No response from server");
    
            } else {
                console.log('Error', error.message);
                toast.error(error.message);
            }
            
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

