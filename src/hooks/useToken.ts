import { useState, useEffect } from "react";

const useToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoaded(true)
    }, []);

    return [token, loaded];
};

export default useToken;
