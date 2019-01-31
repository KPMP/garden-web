import React, { Component } from 'react';

class Pet extends Component {
	render() {
		return (
			<div>
				<div>Name: {this.props.pet.name}</div>
				<div>Age: {this.props.pet.age}</div>
				<div>Type of Animal: {this.props.pet.type}</div>
			</div>
		);
	}
	
}

export default Pet;