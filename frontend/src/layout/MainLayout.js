import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
	const GContext = useContext(GlobalContext);
	const { loading, setLoading, logout } = GContext;
	const navigate = useNavigate();

	const handleCLick = (key) => {
		if (key === "logOut") {
			logout(navigate);
			return;
		} else if (key === "viewImage") {
			navigate("/view-image");
			return;
		} else if (key === "uploadImage") {
			navigate("/upload-image");

			return;
		}
	};
	return (
		<Layout>
			<Header
				style={{
					position: "fixed",
					zIndex: 1,
					width: "100%",
				}}
			>
				{/* <div className="logo" /> */}
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["uploadImage"]}
					items={[
						{
							key: `uploadImage`,
							label: `Upload Image`,
						},
						{
							key: `viewImage`,
							label: `View Images`,
						},
						{
							key: `logOut`,
							label: `Log Out`,
						},
					]}
					onClick={(e) => handleCLick(e.key)}
				/>
			</Header>
			<Content
				className="site-layout"
				style={{
					padding: "0 50px",
					marginTop: 64,
				}}
			>
				<div
					className="site-layout-background"
					style={{
						padding: 24,
						minHeight: 380,
					}}
				>
					Content
				</div>
			</Content>
			<Footer
				style={{
					textAlign: "center",
				}}
			>
				React - Flask
			</Footer>
		</Layout>
	);
};

export default MainLayout;
