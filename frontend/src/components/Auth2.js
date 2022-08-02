import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

const Auth2 = () => {
	function handleCallbackResponse(response) {
		console.log("Encoded JWT ID token:" + response.credential);
		console.log(response);

		let userObject = jwt_decode(response.credential);
		console.log(userObject);
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id:
				"308703956175-30b0tdfpdj9jtefec8p2cct4ut7qs355.apps.googleusercontent.com",
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById("siginDiv"), {
			theme: "outline",
			size: "large",
			width: "300px",
		});
	}, []);

	return <div id="siginDiv"></div>;
};

export default Auth2;
