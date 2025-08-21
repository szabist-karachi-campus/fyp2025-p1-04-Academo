import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { api } from "../../api";
import toast from "react-hot-toast";

export const useSignup = () => {

    const [loading, setLoading] = useState(false)

    const { setAuthUser } = useAuthContext();
    
    const signup = async ({fullName, username, darja, password, confirmPassword, role, admin, phoneNumber, adminPassword}) =>{
        try {
            setLoading(true)

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if(!passwordRegex.test(password)){
                alert("Password must be at least 8 characters long, contain one uppercase letter, and one number.");
                return;
            }

            const adminres = await api.post('/admin', {username: admin, password:adminPassword})
            if(!adminres){
                console.log('admin not found')
                return;
            }
            console.log(adminres.data)

            const darjares = await api.post('/darja', {darja})
            console.log(darjares.data)

            const res = await api.post('/auth/signup', { fullName, username, role, admin: adminres.data, phoneNumber:'03312211782', password, darja:darjares.data, confirmPassword, })
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
    return { loading, signup }
}

