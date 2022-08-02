import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { ListFiles } from "../resources/LoadData";
const ViewImages = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		ListFiles(setData);
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<Image.PreviewGroup>
			{data &&
				data.map((filename) => {
					return (
						<Image
							key={filename}
							width={200}
							height={200}
							src={`/api/display-image/${filename}`}
						/>
					);
				})}
		</Image.PreviewGroup>
	);
};

export default ViewImages;
