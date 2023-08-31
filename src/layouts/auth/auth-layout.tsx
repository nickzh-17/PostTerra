import clsx from "clsx";
import React from "react";

import s from "./auth-layout.module.css";

interface AuthLayoutProps {
	title: string;
	children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
	return (
		<div className={clsx(s.authLayout)}>
			<div className={clsx(s.wrapper)}>
				<h1>{title}</h1>
				<div className={clsx(s.content)}>{children}</div>
			</div>
		</div>
	);
};
