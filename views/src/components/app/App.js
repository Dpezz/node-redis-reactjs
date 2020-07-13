import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "../../services/privateRoute";
import PublicRoute from "../../services/publicRoute";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../home/Home";
import Error from "../Error";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute path="/" exact component={Login} />
					<PublicRoute path="/login" component={Login} />
					<PublicRoute path="/register" component={Register} />
					<PrivateRoute path="/home" component={Home} />
					<PublicRoute path="*" component={Error} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
