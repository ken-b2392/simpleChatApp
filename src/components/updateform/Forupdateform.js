import React, {useRef,useState} from 'react';
import './Forupdateform.css';
import { useAuth } from '../../context/AuthProvider';

import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Divider } from '@material-ui/core';

const Forupdateform = () => {

    const newpasswordRef = useRef();
    const confirmnewpasswordRef = useRef();
    const {changePassword} = useAuth();
    
    const [passwordValidate, setPasswordValidate] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);

    const  handlesSubmit = async (e) => {

        e.preventDefault();
        
        const promises = []

        if(newpasswordRef.current.value !== confirmnewpasswordRef.current.value){
            return setPasswordValidate("Mismatch passwords.")
        }else{
            if (confirmnewpasswordRef.current.value){
                promises.push(changePassword(confirmnewpasswordRef.current.value))
            }
            setPasswordValidate("");
            setPasswordChanged(true);
            await Promise.all(promises).then(() => {
                newpasswordRef.current.value="";
                confirmnewpasswordRef.current.value="";
                newpasswordRef.current.focus();
            }).catch(() => {
                setPasswordValidate("Failed to change password.")
            }).finally(()=>{
                setPasswordValidate("");
                setPasswordChanged(false);
            }) 
        }
    }


    return(
        <div>
            {passwordChanged ? <Alert severity="success" variant="filled">Password Changed!</Alert> : null}
            {passwordValidate.length === 0 ?
                null 
                :
                <div className="forMismatchPassword">
                    {passwordValidate && <Alert variant="filled" severity="error" >{passwordValidate}</Alert>}
                </div>
            }
            <form autoComplete="off" onSubmit={handlesSubmit}>
                <DialogTitle id="form-dialog-title">Update Account Password</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField inputRef={newpasswordRef} type="password" id="input-with-icon-grid" label="New Password" required/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField 
                                inputRef={confirmnewpasswordRef} 
                                type="password" 
                                id="input-with-icon-grid" 
                                label="Confirm Password"/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <div className="submit-update-button-container">
                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="medium" 
                            color="primary" 
                            className="update-button" 
                            fullWidth>
                            Update Account 
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </div>
    )
};

export default Forupdateform;