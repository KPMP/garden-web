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
			userData: {
				username: "admin" + Math.floor(Math.random() * 1000),
				password: "password"
			},
			allTasks: [],
			token: null,
			authenticated: false
		};
	}

	loginClick = () => {
		window.location.href = "https://qa-demo.kpmp.org/api/login?redirect=http://localhost:3000";
	};

	addTaskClick = () => {
		this.callApi("http://localhost:8080/tasks", "POST", {description: "create JWT spike"});
	};

	getTasksClick = () => {
		let allTasks = this.callApi("http://localhost:8080/tasks", "GET");
		this.setState({allTasks: allTasks});
	};

	checkAuth() {

		let config = {
			method: 'GET',
			crossDomain:true,
			mode: 'cors'
		};

		if (this.state.token !== null) {
			return true;
		}
		else {
			fetch('https://qa-demo.kpmp.org/api/auth', config)
				.then(response => response.json().then(data => ({data, response})))
				.then(({ data, response }) => {
					if (!response.ok) {
						return Promise.reject(data)
					} else {
						localStorage.setItem('access_token', data.token);
						this.setState({token: data.token});
						return true;
					}
				}).catch(err => console.log("Error: ", err));
		}
	}

	getJWT(userData) {
		let config = {
			method: 'POST',
			headers: { 'Content-Type':'application/json' },
			body: JSON.stringify(userData)
		};

		fetch('http://localhost:8080/users/sign-up', config)
			.then(() => fetch('http://localhost:8080/login', config))
			.then(response => response.json().then(user => ({user, response}))
		).then(({ user, response }) => {
				if (!response.ok) {
					return Promise.reject(user)
				} else {
					localStorage.setItem('access_token', user.token);
					this.setState({token: user.token})
				}
			}).catch(err => console.log("Error: ", err));
	}

	callApi(endpoint, method, data = null) {

		let token = localStorage.getItem('access_token') || null;
		let config = {};

		config = {
			method: method,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
		if (method === 'POST') {
			config.body = JSON.stringify(data)
		}

		let resData = fetch(endpoint, config)
			.then(response => response.json().then(resData => ({resData, response}))
		).then(({ resData, response }) => {
				if (!response.ok) {
					return Promise.reject(resData)
				} else {
					this.setState({allTasks: resData});
				}
			}).catch(err => console.log("Error: ", err))
		return resData;
	}

	componentWillMount() {
		localStorage.clear();
		this.setState({authenticated: this.checkAuth()});
	}

	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Container fluid>
						<NavBar/>
						<div id="main-page">
							<Button onClick={this.loginClick}>Login</Button>
							<div>Your JWT is: {localStorage.getItem("access_token")} </div>
							{this.state.authenticated ? <div>You are authenticated!</div> : <div>You are NOT authenticated</div>}
							<Button onClick={this.addTaskClick}>Add task</Button>
							<Button onClick={this.getTasksClick}>Get tasks</Button>
							<div>Tasks: {JSON.stringify(this.state.allTasks)}</div>
						</div>
					</Container>
				</Router>
			</Provider>
		);
	}
}

export default App;
