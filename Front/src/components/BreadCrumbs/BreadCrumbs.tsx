import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import Typography from "components/UI/Typography/Typography";

import styles from "./BreadCrumbs.module.css";

export interface BreadCrumb {
	link: string;
	label: string;
}

interface BreadCrumbsProps {
	breadcrumbs: BreadCrumb[];
	className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadcrumbs, className }) => {
	return (
		<ul className={clsx(styles.list, className)}>
			{breadcrumbs.map(({ label, link }, i) => (
				<li key={link} className={styles.listItem}>
					<NavLink to={link}>
						<Typography className={styles.link} variant="span" color="second">
							{label}
						</Typography>
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default BreadCrumbs;
