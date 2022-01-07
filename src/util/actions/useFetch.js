import {useCallback, useState} from "react";

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendReq = useCallback(async (userName, applyFn) => {
        setIsLoading(true);
        setError(null);
        try {

            const res = await fetch(`https://api.chess.com/pub/player/${userName}/games`)
            if(res.code === '0') {
                new Error(`User not found by userName: ${userName}`);
            }
            const data = await res.json();

            applyFn(data);

        } catch (err) {
            setError(err || 'Something went wrong');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendReq
    }
}