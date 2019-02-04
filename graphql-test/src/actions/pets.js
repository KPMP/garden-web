import Api from '../helpers/Api';
import actionNames from './actionNames';

const api = Api.getInstance();

export const setPets = (pets) => {
	return {
		type: actionNames.SET_PETS,
		payload: pets
	}
}

export const getPets = () => {
	return (dispatch) => {
		api.post('http://localhost:8080/graphql', {
				  "operationName": null,
				  "variables": {},
				  "query": "{ pets { name age type __typename}}"
		}).then(res=> {
			dispatch(setPets(res.data.data.pets));
		})
	}
}
