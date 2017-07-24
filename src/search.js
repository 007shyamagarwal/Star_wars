import axios from 'axios';
import React, { Component } from 'react';
import _ from 'lodash';
import './search.css';
import { BrowserRouter, Route, Link ,Redirect} from 'react-router-dom';
class Search extends Component
{

    counter=0;
    start_time=Date.now();
    constructor(){
            super();
            this.state={
                planets:'',
                count:'',
            };
    }

    componentWillMount(){

          this.search();
            
    }

    updateSearch(){
        this.search(this.refs.query.value);

    }


    search(query=""){
            let endTime=Date.now();
            let diff=endTime-this.start_time;
            let username=sessionStorage.getItem("UserName");
            console.log("time diff is "+ diff);
            console.log("counter is"+ this.counter);
            if(this.counter>15 &&  endTime-this.start_time<30000){
                setTimeout(alert("you have excedded no of searches"),60000-diff);
                this.counter=0;
                
            }
            else{
            var url=`http://swapi.co/api/planets/?search=${query}`;
            console.log(url);
            axios.get(url).then( response =>  {

                // console.log("i have something");
              console.log(response);
               this.setState({

                        planets:response.data.results,
                        count:response.data.count,

                });
               // console.log(response.data.results[0]);

            }).catch(function(error)
            {
                console.log(error);
            });

            this.counter++;}
    }

    render()
    {

          const isAlreadyAuthenticated=sessionStorage.getItem("loggedIn");
        var planets=
        _.map(this.state.planets, (planet) =>{
            let x=Math.log(planet.population);
            console.log(x);

            return <li style={{ height:(x*1.5)}}>{planet.name}</li>;
        });
        return(
            <div >
                 {!isAlreadyAuthenticated ? <Redirect to={{ pathname: '/'}}/>:(
            <div> 
                <input className="searchbox" ref="query" onChange = { (e) =>  {   this.updateSearch() ; }}type='text'  />
               <br/>
               <br/>

               <div> <ul className="ul">{planets}</ul></div>
            </div>
                 )}
                </div>
        );
    }
}

export default Search;