import Typography from "components/UI/Typography/Typography";
import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Logo.module.css";

const Logo: React.FC = () => {
	return (
		<NavLink to={"/"}>
			<div className={styles.logo}>
				<Typography className={styles.logoFirst} variant="h1">
					POST
				</Typography>
				<Typography className={styles.logoSecond}>terra</Typography>
			</div>
		</NavLink>
	);
};

export default Logo;
