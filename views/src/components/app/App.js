import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../home/Home";
import Error from "../Error";

function App(context) {
	return (
		<Router>
			<div>
				<div className="container mt-3">
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/home" component={Home} />
						<Route path="*" component={Error} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
