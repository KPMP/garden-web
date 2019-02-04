import actionNames from '../actions/actionNames';

export const pets = ( state=[], action) => {
	switch(action.type) {
		case actionNames.SET_PETS:
			let newState = action.payload;
			return newState;
		default:
			return state;
	}
}