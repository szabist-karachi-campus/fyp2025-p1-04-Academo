import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { api } from "../../../api";
import toast from "react-hot-toast";

export const useSubmit = () => {

    const [loading, setLoading] = useState(false)

    const { setAuthUser } = useAuthContext();

    const submit = async (course, username ) => {
        try {
            setLoading(true)
            console.log(course, username)

            const res = await api.patch('/courses', {
                username,
                course
            })
            const data = res.data;

            if (data.error) {
                throw new Error(data.error)
            }
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
    return { loading, submit }
}

