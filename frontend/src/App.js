import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
	const [data, setData] = useState([{}]);
	useEffect(() => {
		fetch("/members")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				console.log(data);
			});
	}, []);

	return (
		<div className="App">
			{!data.oof ? (
				<p>Loading...</p>
			) : (
				<>
					<p>{data.oof}</p>
					<p>{data.oof2}</p>
				</>
			)}
		</div>
	);
}

export default App;
