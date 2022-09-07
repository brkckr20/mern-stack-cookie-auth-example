import React, {useContext} from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

const LogOutBtn = () => {

    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    async function logOut() {
        await axios.get("http://localhost:4000/auth/logout");
        await getLoggedIn();
        history.push("/");
    }

    return (
        <button
            onClick={logOut}
        >LOGOUT</button>
    )
}

export default LogOutBtn