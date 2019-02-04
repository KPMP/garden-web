import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Pet from './Pet';
import { connect } from 'react-redux';
import { getPets } from '../actions/pets';


const PET_QUERY = gql`
{ 
    pets { 
        name 
        age 
        type 
    } 
} 
`;

class PetList extends Component {
	
	componentDidMount() {
		getPets()(this.props.dispatch);
	}
	
	render() {
		return (
		<div>
		  <Query query={PET_QUERY}>
		  	{({ loading, error, data }) => {
	          if (loading) return <div>Fetching</div>
	          if (error) return <div>Error</div>
	    
	          const pets = data.pets;
	          return (
	        	<div>
	        		Pets retrieved via Query object inline:<br/>
	        		 {pets.map(pet=> <Pet key={pet.age} pet={pet} />)} 
	        	</div>
	          )
		    }}
		  </Query>
		  	<br/>
		  	<div>
		  		Pets retrieved through a post action: <br/>
		  		{this.props.pets.map(pet=> <Pet key={pet.age} pet={pet} />)} 
		  	</div>
		 </div>
		)
	}
}
		  	
export default connect()(PetList);