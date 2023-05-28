import Calculator from "./pages/calculator";
import * as React from 'react';
import {useState} from 'react';
import ResponsiveAppBar from "./components/AppBar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignInScreen from './pages/signIn';
import {UserContext} from './helpers/UserContext';
import WithAuthentication from "./components/withAuthentication";
import {ROUTES} from "./ROUTES";
import Account from "./pages/account";

function App() {
    const [user, setUser] = useState();

    // @ts-ignore
    return (<UserContext.Provider value={{user, setUser}}>
        <Router>
            <ResponsiveAppBar/>
            <Routes>
                <Route path={ROUTES.SIGN_IN} element={<SignInScreen/>}/>
            </Routes>
            <WithAuthentication/>
            <Routes>
                <Route path={"/"} element={<Account/>}/>
                <Route path={ROUTES.CALCULATOR} element={<Calculator/>}/>
                <Route path={ROUTES.ACCOUNT} element={<Account/>}/>
            </Routes>

        </Router>
    </UserContext.Provider>);

}

export default App
