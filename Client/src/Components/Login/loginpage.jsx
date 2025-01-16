import React from 'react';
import Login from '../login';

function LoginPage() {
    return (
        <>
            <div className="login-page">
                <div className="lcontainer">
                    <div className="lrow">
                        <img src="./images/loginimg.png" alt=''/>
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
