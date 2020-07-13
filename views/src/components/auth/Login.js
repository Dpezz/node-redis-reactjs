import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Axios from "axios";

function Login(props) {
	const [item, setItem] = useState({
		user: "",
		password: "",
	});

	const handleChange = (event) => {
		setItem({ ...item, [event.target.name]: event.target.value });
	};

	const handleClick = (event) => {
		Axios.post("http://localhost:8000/api/login", item)
			.then((res) => {
				var inOneMinutes = new Date(new Date().getTime() + 2 * 60 * 1000);
				Cookies.set("_auth", res.data.session, { expires: inOneMinutes });
				props.history.push("/home");
			})
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<h1>Login</h1>
			<form>
				<label htmlFor="user">User</label>
				<input
					id="user"
					type="text"
					name="user"
					value={item.user}
					onChange={handleChange}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					value={item.password}
					onChange={handleChange}
					required
				/>
				<button type="button" onClick={handleClick}>
					Login
				</button>
			</form>
			<Link to="/register">Register</Link>
		</div>
	);
}

export default Login;
