import { isAuth } from "./auth";

const session = (props) => {
	const time = setInterval(() => {
		const isAuthenticated = isAuth();
		console.log(time);
		console.log(props);
		if (
			!isAuthenticated &&
			props.location.pathname !== "/" &&
			props.location.pathname !== "/login" &&
			props.location.pathname !== "/register"
		) {
			props.history.push("/");
			clearInterval(time);
		}
	}, 3000);
	return () => clearInterval(time);
};

export default session;
