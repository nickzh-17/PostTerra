import Typography from "components/UI/Typography/Typography";
import React from "react";

import styles from "./Logo.module.css";

const Logo: React.FC = () => {
	return (
		<div className={styles.logo}>
			<Typography className={styles.logoFirst} variant="h1">
				POST
			</Typography>
			<Typography className={styles.logoSecond}>terra</Typography>
		</div>
	);
};

export default Logo;
