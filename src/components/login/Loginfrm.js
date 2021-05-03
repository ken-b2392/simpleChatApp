import React, { useState, useRef } from 'react';
import './Loginfrm.css';
import {NavLink, useHistory} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';


import { useAuth } from '../../context/AuthProvider';

const LoginForm = () => {
  
    const emailRef = useRef();
    const confirmpasswordRef = useRef();
    const history = useHistory();
    const {logIn} = useAuth();
  
    const [passwordValidate, setPasswordValidate] = useState("");
    const [fordemo, setFordemo] = useState(true);

    const  handlesSubmit = async (e) => {
        e.preventDefault();
        
        try{
            setFordemo(false);
            setPasswordValidate("")
            await logIn(emailRef.current.value, confirmpasswordRef.current.value);
            history.push("/");
        }catch (err){
            setPasswordValidate(err.message);
        }
        
    }

    const  handlesDemo = async (e) => {
        e.preventDefault();
        try{
            setFordemo(true);
            await logIn("testemail@test.com", "testemail");
            console.log(logIn())
            history.push("/");
        }catch (err){
            setPasswordValidate(err.message);
        }
        
    }

  return(
    <div className="form-wrapper">
        <div>
            <div className="login-container">
            {
                fordemo ? 
                    null
                :
                    passwordValidate.length === 0 ?
                        null 
                        :
                        <div className="forMismatchPassword">
                            {passwordValidate && <Alert variant="filled" severity="error">{passwordValidate}</Alert>}
                        </div>
            }
                <form autoComplete="off" onSubmit={handlesSubmit}>
                    <div className="login-header">
                        <div className="personCircle">
                            <div className="forHead"></div>
                            <div className="forBody"></div>
                        </div>
                        <div className="loginAccount">
                            <h3>Login</h3>
                            <h3>Account</h3>
                        </div>
                    </div>
                    <div className="inputs-container-wrapper">
                        <div className="inputs-container">
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField inputRef={emailRef} id="input-with-icon-grid" label="Email" required/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <LockIcon />
                                </Grid>
                                <Grid item>
                                    <TextField inputRef={confirmpasswordRef} type="password" id="input-with-icon-grid" label="Password" required/>
                                </Grid>
                            </Grid>
                        </div> 
                    </div>
                    <div className="submit-button-container">
                        <Button type="submit" variant="contained" size="medium" color="primary" className="login-button">
                            Log in 
                        </Button>
                    </div>
                    <div className="links-wrapper">
                        <div className="sign-up-container">
                            <NavLink to = "/signup" className="nav-link">
                                Create Account
                            </NavLink>
                        </div>
                        <div className="divider"></div>
                        <div className="forgot-password-container">
                            <NavLink to = "/forgot_password" className="nav-link">
                                Forgot Password?
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
            <div style={{marginTop: "1rem"}}>
                <Button onClick={handlesDemo} type="submit" variant="contained" size="medium" color="primary" className="login-button">
                    Demo Account
                </Button>
            </div>
        </div>
    </div>
   )

 }

export default LoginForm;