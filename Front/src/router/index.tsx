import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes-list";

import { useSelector } from "react-redux";

import { getUserSlice } from "store/user/user.selectors";

const Router: React.FC = () => {
	const { isAuth } = useSelector(getUserSlice);

	return (
		<BrowserRouter>
			<Routes>
				{(isAuth ? privateRoutes : publicRoutes).map(routeItem => (
					<Route path={routeItem.path} element={routeItem.element} key={routeItem.path} />
				))}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
