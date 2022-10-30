import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import Admin from './Admin';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js';

import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


class AddStudent extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, name:"", email:"", message:"" };
    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };
 
    handleClose = () => {
      this.setState( {open:false, name:"", email:"", message:""} );
    };
 
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
 
    handleAdd = () => {
        const token = Cookies.get('XSRF-TOKEN');
               let   rc = 0;
        fetch(`${SERVER_URL}/student`, 
          {  
              method: 'POST', 
                        headers: { 'Content-Type': 'application/json',
                                   'X-XSRF-TOKEN': token  }, 
                 body: JSON.stringify(
                    {name: this.state.name, email:this.state.email})
          } )
        .then((response) => { 
                   rc = response.status;
                   return response.json(); 
               })
               .then((response) => {
                 if (rc == 200) {
                    this.setState({id: response.id, message: "Student " + this.state.name + " was added."});
                 } else {
                    this.setState({message: "Add failed. Email already exists. rc="+rc});
                 }
                })    
         .catch(err => {
            this.setState({message: "Add failed. "+err});
          }
         )
           }
 
    render()  { 
      return (
        <div>
          <Button variant="outlined" color="primary" style={{margin: 10}}
                  onClick={this.handleClickOpen}>
            Add Student
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <h3 id="message"> {this.state.message} </h3>
              <TextField autoFocus fullWidth label="Name" name="name" 
                       onChange={this.handleChange}  />
              <br/><br/>
              <TextField fullWidth label="Email" name="email" onChange={this.handleChange}/>    
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>Close</Button>
              <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
        </div>
      ); 
    }
}
export default AddStudent;
