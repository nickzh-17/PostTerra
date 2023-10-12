import clsx from "clsx";
import React, { useLayoutEffect, useState } from "react";
import l1 from "./img/circles.svg";
import styles from "./Loader.module.css";

interface LoaderProps {
	isTransparent: boolean;
}

function enableScroll() {
	document.body.classList.remove("noScroll");
}
function disableScroll() {
	document.body.classList.add("noScroll");
}
function getPageHeight() {
	const body = document.body;
	const html = document.documentElement;

	const height = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);

	return `${height}px`;
}

export const Loader: React.FC<LoaderProps> = ({ isTransparent = true }) => {
	const [height, setHeight] = useState("100vh");

	useLayoutEffect(() => {
		setHeight(getPageHeight());
		disableScroll();

		return () => {
			enableScroll();
		};
	}, []);

	return (
		<div className={clsx(styles.loaderWrapper, { [styles.nonTransparent]: !isTransparent })} style={{ height: height }}>
			<img className={styles.loader} src={l1} alt="loader" />
		</div>
	);
};
