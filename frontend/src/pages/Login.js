import React, { useContext, useEffect } from "react";
import Auth2 from "../components/Auth2";
import { Button } from "antd";
import { TestToken } from "../resources/LoadData";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "../resources/LoadData";
const Login = () => {
	const GContext = useContext(GlobalContext);
	const { loading, setLoading, setAuth, setUserInfo, Auth } = GContext;
	const navigate = useNavigate();
	useEffect(() => {
		const localToken = localStorage.getItem("token");
		if (localToken) {
			VerifyToken(setLoading, setAuth, navigate, setUserInfo);
		}
	}, []);
	useEffect(() => {
		if (Auth) {
			navigate("/upload-image");
		}
	}, [Auth]);

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
