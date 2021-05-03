import React from 'react';
import './Fordashboard.css';
import Forchatbox from '../chatbox/Forchatbox';
import Forappbar from '../appbar/Forappbar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fortopbar from '../topbar/Fortopbar';


const Fordashboard = () => {

  return(
      <div className="dashboard-wrapper">
        <Fortopbar />
        <div className="dashboard-container">
            <Card>
              <CardContent>
                  <div>
                    <div className="top-container">
                      <Forappbar/>
                    </div>
                    <div className="chatBox-container">
                      <Forchatbox/>
                    </div>
                  </div>
                </CardContent> 
            </Card>
        </div>
      </div>
   )

 }

export default Fordashboard