import clsx from "clsx";
import React from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: "primary" | "secondary" | "transparent";
	variant?: "standard" | "wide" | "icon" | "clear";
	children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	color = "transparent",
	variant = "standard",
	className,
	type,
	...buttonProps
}) => {
	return (
		<button
			className={clsx(styles.button, styles[color], styles[variant], className)}
			onClick={onClick}
			type={type}
			{...buttonProps}
		>
			{children}
		</button>
	);
};

export default Button;
