import { Upload, Image } from "antd";
import ImgCrop from "antd-img-crop";

import React, { useState } from "react";

const UploadImage = () => {
	const [fileList, setFileList] = useState([
		{
			uid: "-1",
			name: "image.png",
			status: "done",
			url: "https://avatars.githubusercontent.com/u/97225946?v=4",
		},
	]);

	const onChange = ({ fileList: newFileList }) => {
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

	return (
		<>
			<ImgCrop rotate>
				<Upload
					// action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					action="http://localhost:3000/"
					listType="picture-card"
					fileList={fileList}
					onChange={onChange}
					// onPreview={onPreview}
				>
					{fileList.length < 5 && "+ Upload"}
				</Upload>
			</ImgCrop>
			<Image.PreviewGroup>
				{fileList.map((file) => {
					return <Image key={file.url} width={200} src={file.url} />;
				})}
			</Image.PreviewGroup>
		</>
	);
};

export default UploadImage;
