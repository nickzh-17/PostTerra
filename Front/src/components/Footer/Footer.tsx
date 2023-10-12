import Typography from "components/UI/Typography/Typography";
import React from "react";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.copyright}>
				<Typography variant="span">©2023 post terra</Typography>
			</div>
		</div>
	);
};

export default Footer;
