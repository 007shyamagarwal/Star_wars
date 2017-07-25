import axios from 'axios';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './main.css';
import './search.css';
import Search from './search.js';
import { BrowserRouter, Route, Link ,Redirect} from 'react-router-dom';
class Login extends Component {

isLoggedIn = 'false';

constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  }
 }


handleClick(event){
 var apiBaseUrl ="http://swapi.co/api/people/";
 var url=apiBaseUrl+"?search="+this.state.username;
 var username=this.state.username;
 var password=this.state.password;
 var self=this;
 axios.get(url)
   .then(function (response) {
       console.log(response);
         if(response.data.count==1){
             console.log("got in ");
             if((username==response.data.results[0].name) &&
                         (password==response.data.results[0].birth_year))
                    {
                        console.log("Login successfull");
                        alert("you have successfully logged in ");
                        self.isLoggedIn=true;
                        sessionStorage.setItem("loggedIn",true);
                        sessionStorage.setItem("UserName",username);
                        self.setState();
                        console.log("hey "+ self.isLoggedIn);
                    } 

              else 
                    {
                        alert("UserName of Password incorrect ");
                    }

        }
        else{
            console.log("Username does not exists");
            alert("Username does not exist");
        }
   })
    .catch(function (error) {
            console.log(error);
    });


      console.log("jjjjjjj"+this.isLoggedIn);
 }


render() {
 let isAlreadyAuthenticated=sessionStorage.getItem("loggedIn");
//  console.log("hey already authenticated"+isAlreadyAuthenticated);

    return (
      <div>
        
              {isAlreadyAuthenticated ? <Redirect to={{ pathname: '/search'}}/>:(
        <div>        
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Star Wars Login Page"
           />
           

           <TextField
            inputstyle={{textAlign: 'center',}}
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
            <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <br/>
             <RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
         </div>)}
      </div>
    );
  }





}

export default Login;
