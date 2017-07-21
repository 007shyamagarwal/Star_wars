import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Content from './Content.js';
import Login from './Login.js';
import Search from './search.js';

import { BrowserRouter, Route, Link ,Switch } from 'react-router-dom';


class App extends Component {


  render() {
    return (
      <div>

            <BrowserRouter>
                    <div>
                    <Switch>
                    <Route exact path="/" component={Login}/>
                     <Route path="/search" component={Search}/>
                    </Switch>
                    </div>
                    </BrowserRouter>
              
     </div>
    );
  }
  


}





export default App;
