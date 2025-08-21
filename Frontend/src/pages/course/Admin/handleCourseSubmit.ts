import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { api } from "../../../api";
import toast from "react-hot-toast";
import { ExtractData } from "../../../extractingDataFromCookies";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export const useSubmit = () => {

    ExtractData();

    const { _id } = useSelector((state: RootState) => state.user);

    const [loading, setLoading] = useState(false)

    const { setAuthUser } = useAuthContext();

    const submit = async ({ title, image, description, teacher, darja, status}) => {
        try {
            setLoading(true)
            console.log(title, image, description, teacher, darja , status)
            const darjares = await api.post('/darja', {darja})
            const teacherres = await api.post('/teacher', {teacher})

            const res = await api.post('/courses', {
                courseTitle: title,
                image: image,
                description: description,
                teacher: teacherres.data,
                darja: darjares.data,
                status: status,
                admin: _id
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

