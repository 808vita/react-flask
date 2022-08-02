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

			navigate("/oof");
		});
	setLoading(false);
};

export const VerifyToken = async (setLoading, setAuth, navigate) => {
	setLoading(true);

	await fetch(`/api/verify-token`, {
		method: "POST",
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
				navigate("/");
				return;
			}
			setAuth(data.Auth);
		});
	setLoading(false);
};
