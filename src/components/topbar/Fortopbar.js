import React from 'react';
import './Fortopbar.css';
import chatAppLogo from '../../assets/logo.svg';
import {NavLink} from 'react-router-dom';

const Fortopbar = () => {
  return(
    <div className="top-wrapper">
        <div className="top-container-chatApp">
            <div className="logo-container-chatApp">
                <NavLink to='/'><img src={chatAppLogo} alt="login-chatapp-logo" /></NavLink>
            </div>
            <div className="chat-appName-container">
                <NavLink to='/' className="nav-link-appNameContainer">
                    <h1>Sample Login & Chat All App</h1>
                </NavLink>
            </div>
        </div>
    </div>
   )

 }

export default Fortopbar