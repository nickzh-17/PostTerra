import Logo from "components/Logo/Logo";
import React from "react";

import styles from "./Header.module.css";

const Header: React.FC = () => {
	return (
		<div className={styles.header}>
			<Logo />
		</div>
	);
};

export default Header;
