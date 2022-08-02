import React, { useState } from "react";
import { Image } from "antd";
const ViewImages = () => {
	const [fileList, setFileList] = useState([
		{
			uid: "-1",
			name: "image.png",
			status: "done",
			url: "https://avatars.githubusercontent.com/u/97225946?v=4",
		},
		{
			uid: "1",
			name: "gigafloppa.png",
			status: "done",
			url: "https://i.redd.it/p7e9jyxsxjv61.jpg",
		},
	]);
	return (
		<Image.PreviewGroup>
			{fileList.map((file) => {
				console.log(file);
				return <Image key={file.url} width={200} src={file.url} />;
			})}
		</Image.PreviewGroup>
	);
};

export default ViewImages;
