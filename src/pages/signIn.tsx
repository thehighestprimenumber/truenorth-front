import React, {useContext} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {Navigate} from 'react-router-dom';
import {auth, uiConfig} from "../firebaseSettings";
import {ROUTES} from "../ROUTES";
import {UserContext} from "../helpers/UserContext";

function SignInScreen() {
    const context = useContext(UserContext);
    const user = context?.user;
    if (!user?.uid) {
        return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </div>);
    }

    return <Navigate to={ROUTES.CALCULATOR}/>;
}

export default SignInScreen;
