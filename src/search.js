import axios from 'axios';
import React, { Component } from 'react';
import _ from 'lodash';
import './search.css';
class Search extends Component
{
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

    }

    render()
    {
        var planets=
        _.map(this.state.planets, (planet) =>{
            let x=Math.log(planet.population);
            console.log(x);

            return <li style={{ height:(x*1.5)}}>{planet.name}</li>;
        });
        return(
            <div >
            <div> 
                <input className="searchbox" ref="query" onChange = { (e) =>  {   this.updateSearch() ; }}type='text'  />
               <br/>
               <br/>

               <div> <ul className="ul">{planets}</ul></div>
            </div>

                </div>
        );
    }
}

export default Search;