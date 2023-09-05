import Main from "pages/Main";
import SignInPage from "pages/SignIn";
import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import Main from "pages/Main";
// import Post from "pages/Post";
// import SignIn from "pages/SignIn";
// import SignUp from "pages/SignUp";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<Navigate to="/" />} />

				<Route path="/" element={<Main />} />
				{/* <Route path="/posts/:id" element={<Post />} /> */}
				<Route path="/sign-in" element={<SignInPage />} />
				{/* <Route path="/sign-up" element={<SignUp />} /> */}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
