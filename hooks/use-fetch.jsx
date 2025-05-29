import { toast } from "sonner";
import React from "react";


const  useFetch = (cb) => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(null);

    const fn = async (...args) => {

        setLoading(true);
        setError(null);
        try {
            const result = await cb(...args);
            setData(result);
            setError(null);
        } catch (err) {
            setError(err);
            toast.error(err.message || "An error occurred");
        } finally{
            setLoading(false);
        }
        
    };

    return {
        data,
        error,
        loading,
        fn,
        setData,
    };
    
    
}

export default useFetch;