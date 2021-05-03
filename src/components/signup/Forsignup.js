import React, {useState, useRef} from 'react';
import './Forsignup.css';
import {NavLink, useHistory} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { useAuth } from '../../context/AuthProvider';

const Forsignup = () => {

    const createEmailRef = useRef();
    const createpasswordRef = useRef();
    const confirmpasswordRef = useRef();
    const {signUp} = useAuth();
    const history = useHistory();

    const [passwordValidate, setPasswordValidate] = useState("");

    const handlesSubmit = async (e) => {
        e.preventDefault();
        let validEmailChar = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!createEmailRef.current.value.match(validEmailChar)){
            return setPasswordValidate("Enter Valid Email Address")
        }else{
           if(createpasswordRef.current.value !== confirmpasswordRef.current.value){
            return setPasswordValidate("Mismatch passwords.")
            }else{
                try{
                    setPasswordValidate("")
                    await signUp(createEmailRef.current.value, confirmpasswordRef.current.value);
                    history.push("/login")
                }catch (err){
                    setPasswordValidate(err.message); 
                }
            } 
        }
        
    }

  return(
    <div className="form-wrapper">
        <div className="signup-container">
            {passwordValidate.length === 0 ?
                null 
                :
                <div className="forMismatchPassword">
                    {passwordValidate && <Alert variant="filled" severity="error">{passwordValidate}</Alert>}
                </div>
            }
            <form autoComplete="off" onSubmit={handlesSubmit}>
                <div className="signup-header">
                    <div className="signUpAccount">
                        <h3>Create</h3>
                        <h3>Account</h3>
                    </div>
                    <div className="personCircle">
                        <div className="forHead"></div>
                        <div className="forBody"></div>
                    </div>
                </div>
                <div className="inputs-container-wrapper">
                    <div className="inputs-container">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField inputRef={createEmailRef} id="input-with-icon-grid" label="Email Address" required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField inputRef={createpasswordRef} type="password" id="input-with-icon-grid" label="Create Password" required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField inputRef={confirmpasswordRef} type="password" id="input-with-icon-grid" label="Confirm Password" required/>
                            </Grid>
                        </Grid>
                    </div> 
                </div>
                <div className="submit-button-container">
                    <Button type="submit" onClick={handlesSubmit} variant="contained" size="medium" color="primary" className="signup-button">
                        Sign up 
                    </Button>
                </div>
                <div className="Log-in-container">
                    <label className="logincontainerLabel"> Already have account? </label>
                    <NavLink to = "/login" className="nav-link">
                        Log in Here!
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
   )
 }

export default Forsignup