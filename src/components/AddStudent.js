import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {SEMESTER_LIST} from '../constants.js'

import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import {SERVER_URL} from '../constants.js'
import Cookies from 'js-cookie';

const ariaLabel = { 'aria-label': 'description' };


class AddStudent extends Component {
  constructor (props) {
		super(props);
		this.state = {
			name: "", 
			email: "", 
			statusCode: 0};
	};
	
	styles = {
		paddingLeft: 20
	}

	handleStatusChange = (event) => {
		
		this.setState({[event.target.name]: event.target.value});

	}

	handleAddStudent = () => {

		const token = Cookies.get('XSRF-TOKEN'); 


		let student = {
			'name': this.state.name, 
			'email': this.state.email, 
			'statusCode': this.state.statusCode
		};

		fetch (`${SERVER_URL}/student`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json', 
				'X-XSRF-TOKEN': token
			}, 

			body: JSON.stringify(student)
			})
			

		.then(res => {
			if (res.ok) {
				console.log('Student was added.');
			}
			else {
				console.error('Request post http status =' + res.state);
			}
		})
		.catch(err => {
			console.error(err);
		});
	}

  render() {
    return (
	<div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  New Student
               </Typography>
            </Toolbar>
         </AppBar>
		 
		 <div align="justify" style={this.styles} >
				<Box component="form" noValidate autoComplete="off" >
					<FormControl sx={{ width: '25ch' }}>
						<h3> Name: </h3> <OutlinedInput placeholder="Please enter name" name="name" onChange={this.handleStatusChange} />
					</FormControl>
				</Box>
	
			     <Box component="form" noValidate autoComplete="off">
					<FormControl sx={{ width: '25ch' }}>
						<h3> Email: </h3> <OutlinedInput placeholder="Please enter email" name="email" onChange={this.handleStatusChange}/> 

					</FormControl>
				</Box>
	
				<h3>Status Code: </h3>
				<Input disabled defaultValue="0" inputProps={ariaLabel} />

			
			<div>
			<Button  variant="outlined" color="primary" style={{margin: 50}} onClick={this.handleAddStudent}>
				Add New Student
			</Button>
			</div>
		</div>
	</div>
	)
  }
}
export default AddStudent;