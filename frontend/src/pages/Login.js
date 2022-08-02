import React, { useContext } from "react";
import Auth2 from "../components/Auth2";
import { Button } from "antd";
import { TestToken } from "../resources/LoadData";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const GContext = useContext(GlobalContext);
	const { loading, setLoading } = GContext;
	const navigate = useNavigate();
	return (
		<div className="login-form">
			<div className="auth-button">
				<h2>Login</h2>
				<hr></hr>
				<Auth2 />
				<div className="test-token-div">
					<div className="test-token-button">
						<Button
							type="primary"
							block
							onClick={() => TestToken(setLoading, navigate)}
						>
							Try With Test Token
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
