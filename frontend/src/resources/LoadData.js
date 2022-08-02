import {
	errorMessage,
	successMessage,
	warningMessage,
} from "../layout/Messages";

export const LoadOrdersInDateRange = async (fromDate, toDate, setData) => {
	console.log("dateChunks");

	let tempArr = [];

	const token = localStorage.getItem("token");
	if (!token) {
		return;
	}
	const formData = new FormData();
	formData.append("access_token", token);
	formData.append("get_all_orders_range", "true");
	const result = await fetch(`/test-token`, {
		method: "POST",
		body: formData,
	})
		.then((res) => {
			switch (res.status) {
				case 200:
					return res.json();
				default:
					errorMessage("Experienced an error!");
					return { code: "unknown error" };
			}
		})
		.then((data) => {
			if (data.code) {
				return;
			}
			tempArr = [...tempArr, ...data];
		});

	setData(tempArr);
};
