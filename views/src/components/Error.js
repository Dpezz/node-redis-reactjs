import React from "react";
import { Link } from "react-router-dom";

function Error() {
	return (
		<div>
			<h1>Page not found!</h1>
			<Link to="/">volver</Link>
		</div>
	);
}

export default Error;
