import React, { createContext, useState } from "react";

export const GlobalContext = createContext();
const GlobalState = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [Auth, setAuth] = useState(false);
	const [userInfo, setUserInfo] = useState("");
	const logout = (navigate) => {
		localStorage.removeItem("token");
		setAuth(false);
		setUserInfo("");
		navigate("/");
	};
	return (
		<GlobalContext.Provider
			value={{
				loading,
				setLoading,
				Auth,
				setAuth,
				userInfo,
				setUserInfo,
				logout,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
