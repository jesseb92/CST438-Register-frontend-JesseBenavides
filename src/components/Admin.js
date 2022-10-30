import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import AddStudent from './AddStudent';

class Admin extends Component {
 
  render() {    
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Administrative Functions
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
        <AddStudent id="newStu"/>
         </div>
      </div>
    )
  }
}
export default Admin;
