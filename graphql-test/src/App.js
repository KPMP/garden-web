import React, { Component } from 'react';
import NavBar from './components/Nav/NavBar';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import PetList from './components/PetList';

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
	componentWillMount() {
		logPageView(window.location, "");
	}	
	
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Container fluid>
						<NavBar/>
						<div id="main-page">
							<Row>
								<Col>
									<PetList />
								</Col>
							</Row>
						</div>
					</Container>
				</Router>
			</Provider>
		);
	}
}

export default App;
