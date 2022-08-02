import React from "react";
import Auth2 from "../components/Auth2";
import { Button } from "antd";

const Login = () => (
	<div className="login-form">
		<div className="auth-button">
			<h2>Login</h2>
			<hr></hr>
			<Auth2 />
			<div className="test-token-div">
				<div className="test-token-button">
					<Button type="primary" block onClick={(e) => console.log(e)}>
						Try With Test Token
					</Button>
				</div>
			</div>
		</div>
	</div>
);

export default Login;
