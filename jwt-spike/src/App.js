import React, { Component } from 'react';
import NavBar from './components/Nav/NavBar';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import QueryString from 'query-string';

const cacheStore = window.sessionStorage.getItem("redux-store");
const initialState = cacheStore ?
	    JSON.parse(cacheStore) :
	    loadedState;
const store = applyMiddleware(thunk)(createStore)(appReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());	 
const saveState = () => {
    window.sessionStorage.setItem("redux-store", JSON.stringify(store.getState()));
};

// *** Get a new tracking Id and add it here *** //
const GA_TRACKING_ID = '';

ReactGA.initialize(GA_TRACKING_ID);
function logPageView(location, action) {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.pageview(location.pathname + location.search);
}
const history = createHistory();
history.listen((location, action) => {
    logPageView(location, action);
});

store.subscribe(function () {
    console.log(store.getState())
});

store.subscribe(saveState);

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			token: null
		};
	}

	loginClick = () => {
		window.location.href = "https://qa-demo.kpmp.org/api/login?redirect=http://localhost:3000";
	};


	checkAuth() {

		let token = null;
		let query = QueryString.parse(window.location.search);

		if (typeof query.token !== 'undefined') {
			token = query.token;
		}
		else if (this.state.token !== null) {
			token = this.state.token;
		}

		let config = {
			method: 'GET',
			crossDomain:true,
			mode: 'cors'
		};

		if (token !== null) {
			fetch('https://qa-demo.kpmp.org/api/auth?token=' + token, config)
				.then(response => response.json().then(data => ({data, response})))
				.then(({ data, response }) => {
					if (!response.ok) {
						return Promise.reject(data)
					} else {
						this.setState({token: data.token});
						return true;
					}
				}).catch(err => console.log("Error: ", err));
		} else {
			return false;
		}
	}

	componentWillMount() {
		let authState = this.checkAuth();
	}

	render() {
		console.log(this.state)
		return (
			<Provider store={store}>
				<Router history={history}>
					<Container fluid>
						<NavBar/>
						<div id="main-page">
							<Button onClick={this.loginClick}>Login</Button>
							<div>Your JWT is: {this.state.token} </div>
							{this.state.token !== null ? <div>You are authenticated!</div> : <div>You are NOT authenticated.</div>}
						</div>
					</Container>
				</Router>
			</Provider>
		);
	}
}

export default App;
