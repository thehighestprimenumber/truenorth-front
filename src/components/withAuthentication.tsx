import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {getAuth, User as FirebaseUser} from 'firebase/auth';
import {CircularProgress} from '@mui/material';
import {useNavigate} from 'react-router-dom';

import {getUser, getUserData} from "../helpers/firestore/user";
import {User} from "../shared/User";
import {UserContext} from "../helpers/UserContext";
import {ROUTES} from "../ROUTES";

const WithAuthentication = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context ? context.user : null ;
    const [ran, setRan] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
            if (user && context && context.setUser) {
                const userData = (await getUser(user.uid)) as User;
                context.setUser({...user, data: userData});
            }
            setRan(true);
            if (!user) {
                navigate(ROUTES.SIGN_IN);
                return;
            }
        });

        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [auth]);

    useEffect(() => {
        let unsubscribe
        if (user?.uid && context && context.setUser) {
            unsubscribe = getUserData(user?.uid, context.setUser);
        }
        return unsubscribe
    }, [user?.uid]);


    return (<>
        {!ran && <CircularProgress/>}
    </>);
};
export default WithAuthentication;
