import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {useContext} from "react";
import AuthContext from "./context/AuthContext";

function Router() {

    const {loggedIn} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <div>Home ||</div>
                </Route>
                {
                    loggedIn === false && (
                        <>
                            <Route exact path="/register">
                                <Register/>
                            </Route>
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                        </>
                    )
                }

                {
                    loggedIn === true && (
                        <Route exact path="/customer">
                            <div>|| customer</div>
                        </Route>
                    )
                }


            </Switch>
        </BrowserRouter>
    );
}

export default Router;
