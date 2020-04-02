import React, { useState } from 'react';
import '../../StyleSheets/LoginApp.css';
import LoginComponent from './LoginComponent.js';
import RegisterComponent from './RegisterComponent.js';

const LoginPage = props => {
    const [isRegisterPage, setIsRegisterPage] = useState(false);
    const [loginInfo, setLoginInfo] = useState({});
    const [shouldRedirect, setShouldRedirect] = useState(false);

    if (shouldRedirect) {
        try {
            if (!loginInfo || !loginInfo.additionalUserInfo.profile) {
                throw new Error('Error setting cookie');
            }
            props.setCookie('profile', loginInfo.additionalUserInfo.profile);
        } catch (e) {
            console.error(e);
        }
    }

    return isRegisterPage ? (
        <RegisterComponent
            setIsRegisterPage={setIsRegisterPage}
            loginInfo={loginInfo}
            setShouldRedirect={setShouldRedirect}
        />
    ) : (
        <LoginComponent
            setIsRegisterPage={setIsRegisterPage}
            setLoginInfo={setLoginInfo}
            setShouldRedirect={setShouldRedirect}
        />
    );
};

export default LoginPage;
