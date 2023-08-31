import clsx from "clsx";
import React from "react";

import styles from "./Typography.module.css";

interface TypographyProps {
	variant?: "h1" | "h2" | "h3" | "p" | "span";
	className?: string;
	children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant = "p", className, children }) => {
	const Tag = variant;

	return <Tag className={clsx(styles[variant], className)}>{children}</Tag>;
};

export default Typography;
