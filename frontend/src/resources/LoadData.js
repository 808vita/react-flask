import {
	errorMessage,
	successMessage,
	warningMessage,
} from "../layout/Messages";

// export const oof = async (setData) => {
// 	console.log("dateChunks");

// 	let tempArr = [];

// 	const token = localStorage.getItem("token");
// 	if (!token) {
// 		return;
// 	}
// 	const formData = new FormData();
// 	formData.append("access_token", token);
// 	formData.append("get_all_orders_range", "true");
// 	const result = await fetch(`/test-token`, {
// 		method: "POST",
// 		body: formData,
// 	})
// 		.then((res) => {
// 			switch (res.status) {
// 				case 200:
// 					return res.json();
// 				default:
// 					errorMessage("Experienced an error!");
// 					return { code: "unknown error" };
// 			}
// 		})
// 		.then((data) => {
// 			if (data.code) {
// 				return;
// 			}
// 			tempArr = [...tempArr, ...data];
// 		});

// 	setData(tempArr);
// };

export const TestToken = async (setLoading, navigate) => {
	setLoading(true);

	await fetch(`/api/test-token`, {
		method: "get",
	})
		.then((res) => {
			const status = res.status;
			switch (status) {
				case 200:
					return res.json();
				default:
					return { code: res.status };
			}
		})
		.then(async (data) => {
			if (data?.msg) {
				errorMessage({
					show: true,
					message: data?.msg,
				});

				return;
			}
			await localStorage.setItem("token", data.access_token);

			navigate("/upload-image");
		});
	setLoading(false);
};

export const GoogleAuth = async (email, setLoading, navigate) => {
	setLoading(true);

	const formData = new FormData();
	formData.append("email", email);

	await fetch(`/api/google-auth`, {
		method: "POST",
		body: formData,
	})
		.then((res) => {
			const status = res.status;
			switch (status) {
				case 200:
					return res.json();
				default:
					return { code: res.status };
			}
		})
		.then(async (data) => {
			if (data?.msg) {
				errorMessage({
					show: true,
					message: data?.msg,
				});

				return;
			}
			await localStorage.setItem("token", data.access_token);

			navigate("/upload-image");
		});
	setLoading(false);
};

export const VerifyToken = async (
	setLoading,
	setAuth,
	navigate,
	setUserInfo
) => {
	setLoading(true);
	const access_token = localStorage.getItem("token");
	console.log(access_token);
	await fetch(`/api/verify-token`, {
		method: "get",
		headers: {
			Authorization: access_token,
		},
	})
		.then((res) => {
			const status = res.status;
			switch (status) {
				case 200:
					return res.json();
				default:
					return { code: res.status };
			}
		})
		.then(async (data) => {
			if (data?.msg) {
				errorMessage({
					show: true,
					message: data?.msg,
				});
				localStorage.removeItem("token");
				setAuth(false);
				setUserInfo("");
				navigate("/");
				return;
			}
			setAuth(data.auth);
			setUserInfo(data.userName);
		});
	setLoading(false);
};

export const UploadImageController = async (options) => {
	const { onSuccess, onError, file, onProgress } = options;
	const access_token = localStorage.getItem("token");
	console.log(access_token);
	const formData = new FormData();
	formData.append("image", file);
	console.log(formData);
	// "Content-Type": "multipart/form-data",
	await fetch(`/api/upload-image`, {
		method: "post",
		headers: {
			Authorization: access_token,
			enctype: "multipart/form-data",
		},
		body: formData,
	})
		// "content-type": "multipart/form-data",
		// onUploadProgress: (event) => {
		// 	const percent = Math.floor((event.loaded / event.total) * 100);
		// 	setProgress(percent);
		// 	if (percent === 100) {
		// 		setTimeout(() => setProgress(0), 1000);
		// 	}
		// 	onProgress({ percent: (event.loaded / event.total) * 100 });
		// },
		.then((res) => {
			const status = res.status;
			switch (status) {
				case 200:
					onSuccess(res.body);
					return res.json();

				default:
					return { code: res.status };
			}
		})
		.then(async (data) => {
			if (data?.code) {
				errorMessage({
					show: true,
					message: data?.code,
				});

				return;
			}

			console.log(data);
		});
};
