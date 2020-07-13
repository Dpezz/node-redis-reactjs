import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./auth";

function PrivateRoute({ component: Component, ...rest }) {
	const isAuthenticated = isAuth();

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
}

export default PrivateRoute;
