import React, {useState} from 'react';
import './Forappbar.css';
import {useHistory} from 'react-router-dom';
import Forupdateacc from '../updateaccount/Forupdateacc';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';

import { useAuth } from '../../context/AuthProvider';

const Forappbar = () => {



    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false)

    const history = useHistory();
    const {logOut, currentUser} = useAuth();
    const [errorLogOut, setErrorLogOut] = useState("")
    
    const handlesLogOut =  async () => {
        try{
            setErrorLogOut("")
            await logOut()
            history.push("/login")
        }catch{
            setErrorLogOut("Account failed to Log out.");
        }
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
  return(
    <div className={classes.root}>
        {errorLogOut !== "Account failed to Log out." ?
            null 
        :
            <div className="forMismatchPassword">
                {errorLogOut && <Alert variant="filled" severity="error">{errorLogOut}</Alert>}
            </div>
        }
      <AppBar position="static">
        <Toolbar className="appbar">
            <div className="menuAndemail-container">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handlesLogOut}>
                    <ExitToAppIcon className="exit-icon"/>
                    <div className="log-out">Log out</div>
                </IconButton>
                
                <div className="email-container">
                    <Typography variant="h6" className={classes.title}>
                        <div className="email-inside-container">
                            <strong>Email: {currentUser.email}</strong>
                        </div>
                    </Typography>
                </div>
            </div>

            <div className="icon-container" >
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenDialog}
                    color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Forupdateacc 
                    openDialog = {openDialog} 
                    setOpenDialog = {openDialog => setOpenDialog(openDialog)}
                />
            </div>
        </Toolbar>
      </AppBar>
    </div>
    )

}

export default Forappbar