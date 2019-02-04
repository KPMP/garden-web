import {connect} from 'react-redux';
import PetList from './PetList';
import { getPets } from '../actions/pets';

const mapStateToProps = ( state, props ) => ({
	pets: state.pets
});

const mapDispatchToProps = (dispatch, props) => ({
	getPets() {
		dispatch(getPets());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(PetList);