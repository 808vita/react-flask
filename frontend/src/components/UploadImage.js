import { Upload, Image } from "antd";
import ImgCrop from "antd-img-crop";

import React, { useState, useEffect } from "react";
import { UploadImageController } from "../resources/LoadData";
const UploadImage = () => {
	const [fileList, setFileList] = useState([
		{
			uid: "-1",
			name: "image.png",
			status: "done",
			url: "https://avatars.githubusercontent.com/u/97225946?v=4",
		},
	]);
	const [latestUploadedUrl, setLatestUploadedUrl] = useState("");

	useEffect(() => {
		console.log(latestUploadedUrl);
	}, [latestUploadedUrl]);

	const onChange = ({ fileList: newFileList }) => {
		console.log(newFileList);
		setFileList(newFileList);
	};

	const onPreview = async (file) => {
		let src = file.url;

		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);

				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		console.log(src);
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const uploadImage = async (options) => {
		UploadImageController(options, setLatestUploadedUrl);
	};

	return (
		<>
			<ImgCrop rotate>
				<Upload
					// action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					action="/upload-image"
					customRequest={uploadImage}
					listType="picture-card"
					fileList={fileList}
					onChange={onChange}
					// onPreview={onPreview}
				>
					{fileList.length < 5 && "+ Upload"}
				</Upload>
			</ImgCrop>
			<Image.PreviewGroup listType="picture-card">
				{latestUploadedUrl && (
					<>
						<Image
							key={latestUploadedUrl}
							width={200}
							src={latestUploadedUrl}
						/>
						<h3>{latestUploadedUrl.split("/")[3]}</h3>
					</>
				)}
			</Image.PreviewGroup>
		</>
	);
};

export default UploadImage;
