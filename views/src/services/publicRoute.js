import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./auth";

function PublicRoute({ component: Component, ...rest }) {
	const isAuthenticated = isAuth();

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Redirect to="/home" /> : <Component {...props} />
			}
		/>
	);
}

export default PublicRoute;
