import axios from 'axios';
import React, { Component } from 'react';
import _ from 'lodash';
import './search.css';
import { BrowserRouter, Route, Link ,Redirect} from 'react-router-dom';

let counter=0;

class Search extends Component
{

        pristine=true;
   // start_time=Date.now();
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
    resetCounter(){
            counter=0;
    }

    updateSearch(){
       
    let username=sessionStorage.getItem("UserName");
          if(username=="Luke Skywalker")
                this.search(this.refs.query.value);
        else {
         if(this.pristine){
        setInterval(this.resetCounter,60000);
        this.pristine=false;
    }

    console.log("counter is"+ counter);
       // let endTime=Date.now();
        //let diff=endTime-this.start_time;
         //console.log("time diff is "+ diff);
           // console.log("counter is"+ this.counter);
            if(counter>15){
                //setTimeout(alert("you have excedded no of searches"),60000-diff);
                alert("no of searches exceed")
                    return;
                //this.counter=0;
              //  this.start_time=endTime;
                
            }

            else
            this.search(this.refs.query.value);

        }
    }


    search(query=""){
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

           counter++;
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