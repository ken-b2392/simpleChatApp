import React, { useState, useRef } from 'react';
import './Forforgotpassword.css';
import {NavLink} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';


import { useAuth } from '../../context/AuthProvider';

const Forforgotpassword = () => {

    const emailRef = useRef();
    const {resetPassword} = useAuth();
  
    const [resetPassStatus, setResetPassStatus] = useState("")
    const [sentResetStatus, setSentResetStatus] = useState(false)
    const  handlesSubmit = async (e) => {
        e.preventDefault();
        
        try{
            setSentResetStatus(true);
            setResetPassStatus("Check your email for more instructions.");
            await resetPassword(emailRef.current.value);

        }catch{
            setResetPassStatus("Failed to Reset Account Password.");
            setSentResetStatus(false);
        }
        
    }

  return(
    <div className="form-wrapper">
        <div className="login-container">
            {
                sentResetStatus 
                ?
                    <div className="sucessSendResetPasssword">
                        {resetPassStatus && <Alert variant="filled" severity="success">{resetPassStatus}</Alert>}
                    </div> 
                :
                    <div className="sucessSendResetPasssword">
                        {resetPassStatus && <Alert variant="filled" severity="error">{resetPassStatus}</Alert>}
                    </div>
            }
            <form autoComplete="off" onSubmit={handlesSubmit}>
                <div className="login-header">
                    <div className="personCircle">
                        <div className="forHead"></div>
                        <div className="forBody"></div>
                    </div>
                    <div className="ResetAccountPassword">
                        <h3>Reset</h3>
                        <h3>Password</h3>
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
                    </div> 
                </div>
                <div className="submit-button-container">
                    <Button type="submit" variant="contained" size="medium" color="primary" className="login-button">
                        Send Request reset
                    </Button>
                </div>
                <div className="sign-up-container">
                    <label> Don't have an account? </label>
                    <NavLink to = "/signup" className="nav-link">
                        Sign Up Here!
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
   )

 };

export default Forforgotpassword;