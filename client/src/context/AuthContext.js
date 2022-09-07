import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInResponse = await axios.get("http://localhost:4000/auth/loggedin");
        setLoggedIn(loggedInResponse.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

export { AuthContextProvider };