import "./App.css";
import React, { useState, useEffect } from "react";

import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

function App() {
	const [data, setData] = useState([{}]);
	useEffect(() => {
		fetch("/api/members", {
			method: "get",
		})
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				console.log(data);
			});

		fetch("/api/test-token")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				console.log(data);
			});
		const formData = new FormData();
		formData.append("test", "oof");
		fetch("/api/test", {
			method: "get",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				console.log(data);
			});
	}, []);

	return (
		<>
			{/* <MainLayout />
			<div className="App">
				{!data.oof ? (
					<p>Loading...</p>
				) : (
					<>
						<p>{data.oof}</p>
						<p>{data.oof2}</p>
					</>
				)}

				
			</div> */}
			<Login />
		</>
	);
}

export default App;
