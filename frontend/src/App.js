import "./App.css";
import React, { useState, useEffect, useContext } from "react";

import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import { VerifyToken } from "./resources/LoadData";
function App() {
	const [data, setData] = useState([{}]);
	const GContext = useContext(GlobalContext);
	const { loading, setLoading } = GContext;

	// useEffect(() => {
	// 	fetch("/api/test-token")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setData(data);
	// 			console.log(data);
	// 		});

	// 	const formData = new FormData();
	// 	formData.append("test", "oof");
	// 	fetch("/api/test", {
	// 		method: "post",
	// 		body: formData,
	// 	})
	// 		.then((res) => {
	// 			res.json();
	// 		})
	// 		.then((data) => {
	// 			console.log(data);
	// 		});
	// }, []);

	// useEffect(() => {
	// 	if (!data?.access_token) {
	// 		return;
	// 	}
	// 	fetch("/api/members", {
	// 		method: "get",
	// 		headers: {
	// 			Authorization: data?.access_token,
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 		});
	// }, [data]);

	return (
		<Routes>
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
			<Route exact path="/" element={<Login />} />

			{/* <Route exact path="/upload-image" element={<UploadImage />} /> */}
			{/* <Route exact path="/view-image" element={<ViewImage />} /> */}
			<Route exact path="/upload-image" element={<MainLayout />} />
			<Route exact path="/view-image" element={<MainLayout />} />
			<Route exact path="/mainlayout" element={<MainLayout />} />
		</Routes>
	);
}

export default App;
