import React, { useEffect, useState } from "react";
import Axios from "axios";
import session from "../../services/session";
import { removeAuth } from "../../services/auth";

function Home(props) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		session(props);
		fetchItems();
	}, [props]);

	const fetchItems = () => {
		Axios.get("http://localhost:8000/api/characters", {
			withCredentials: true,
		})
			.then((res) => {
				setItems(res.data);
			})
			.catch((err) => console.error(err));
	};

	const handleClick = () => {
		Axios.delete("http://localhost:8000/api/logout")
			.then(() => {
				console.log("start");
				removeAuth(props);
			})
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<h1>Home </h1>
			<button type="button" onClick={handleClick}>
				logout
			</button>
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
