// let's go!
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./css/style.css";

import StorePicker from "./components/StorePicker.js";
import App from "./components/App.js";
import NotFound from "./components/NotFound.js";

const Root = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={ StorePicker } />
				<Route path="/store/:storeId" component={ App } />
				<Route component={ NotFound } />
			</Switch>
		</Router>
	)
}

render(
	<Root />,
	document.getElementById("main")
);