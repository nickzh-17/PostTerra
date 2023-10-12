import ActivatePage from "pages/Activation";
import { CreatePage } from "pages/CreatePage";
import LoginPage from "pages/Login";
import Main from "pages/Main";
import Post from "pages/Post";
import RegistrationPage from "pages/Registration";

import { Navigate } from "react-router-dom";

interface siteRoute {
	path: string;
	element: JSX.Element;
}

export const publicRoutes: siteRoute[] = [
	{
		path: "*",
		element: <Navigate to="/auth/login" />,
	},
	{
		path: "/auth/login",
		element: <LoginPage />,
	},
	{
		path: "/auth/registration",
		element: <RegistrationPage />,
	},
	{
		path: "/auth/activate/:link",
		element: <ActivatePage />,
	},
];

export const privateRoutes: siteRoute[] = [
	{
		path: "*",
		element: <Navigate to="/" />,
	},
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "/posts/:id",
		element: <Post />,
	},
	{
		path: "/posts/create",
		element: <CreatePage />,
	},
];
