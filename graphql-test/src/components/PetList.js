import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Pet from './Pet';

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
	render() {
		return (
		  <Query query={PET_QUERY}>
		  	{({ loading, error, data }) => {
	          if (loading) return <div>Fetching</div>
	          if (error) return <div>Error</div>
	    
	          const pets = data.pets;
	          return (
	        	<div>
	        		 {pets.map(pet=> <Pet key={pet.age} pet={pet} />)} 
	        	</div>
	          )
		    }}
		  </Query>
		)
	}
}
		  	
export default PetList;