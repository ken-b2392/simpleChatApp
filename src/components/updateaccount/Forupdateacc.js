import React from 'react';
import './Forupdateacc.css';
import Forupdateform from '../updateform/Forupdateform';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';


const Forupdateacc = ({openDialog, setOpenDialog}) => {

  return(
   
    <div>
      <Dialog open={openDialog}  aria-labelledby="form-dialog-title">
        <div className="close-button-wrapper">
          <div className="close-button-container">
            <Button 
                type="submit" 
                color="secondary" 
                className="closeBtn" 
                size="small"
                align="right"
                onClick={() => setOpenDialog(false)}
                >
                  <CancelPresentationIcon />
            </Button>
          </div>
        </div>
        <Forupdateform />
        <DialogActions>
          <div className="submit-cancel-button-container">
            <Button 
              onClick={() => setOpenDialog(false)} 
              type="submit" 
              variant="contained" 
              size="medium" color="primary" className="cancel-button" fullWidth>
                Cancel
            </Button>
          </div>      
        </DialogActions>
      </Dialog>
    </div>
   )
 }

export default Forupdateacc