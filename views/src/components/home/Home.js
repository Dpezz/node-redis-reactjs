import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Home(props) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetchItems();
		timeSession();
	}, []);

	const fetchItems = () => {
		Axios.get("http://localhost:8000/api/characters", {
			withCredentials: true,
		})
			.then((res) => {
				setItems(res.data);
			})
			.catch((err) => console.error(err));
	};

	const timeSession = () => {
		const time = setInterval(() => {
			const auth = Cookies.get("_auth");
			if (
				!auth &&
				props.location.pathname !== "/" &&
				props.location.pathname !== "/login" &&
				props.location.pathname !== "/register"
			) {
				props.history.push("/");
				clearInterval(timeSession);
			}
		}, 10000);
	};

	return (
		<div>
			<h1>Home </h1>
			<Link to="/logout">logout</Link>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Status</th>
						<th>Species</th>
						<th>Gender</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, key) => (
						<tr key={key}>
							<td>{key}</td>
							<td>{item.name}</td>
							<td>{item.status}</td>
							<td>{item.species}</td>
							<td>{item.gender}</td>
						</tr>
					))}
				</tbody>
			</table>
		
		</div>
	);
}

export default Home;
