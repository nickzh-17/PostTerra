import Typography from "components/UI/Typography/Typography";
import React from "react";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
	return (
		<div className={styles.footer}>
			<Typography variant="span">©2023 post terra</Typography>
		</div>
	);
};

export default Footer;
