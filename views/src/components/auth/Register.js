import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register(props) {
	const [item, setItem] = useState({
		user: "",
		password: "",
	});

	const handleChange = (event) => {
		console.log(item);
		setItem({ ...item, [event.target.name]: event.target.value });
	};

	const handleClick = (event) => {
		axios
			.post("/api/register", item)
			.then((res) => {
				props.history.push("/login");
			})
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<h1>Register</h1>
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
					register
				</button>
			</form>
			<Link to="/login">Login</Link>
		</div>
	);
}

export default Register;
