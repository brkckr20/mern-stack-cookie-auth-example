import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

function Navbar() {

    const {loggedIn} = useContext(AuthContext);

    return (
        <div>
            <Link to="/">Home - </Link>
            {
                loggedIn === false && (<>
                    <Link to="/register">register - </Link>
                    <Link to="/login">login - </Link>
                </>)
            }
            {
                loggedIn === true && (
                    <>
                        <Link to="/customer">customer - </Link>
                        <LogOutBtn></LogOutBtn>
                    </>

                )
            }

        </div>
    )
}

export default Navbar