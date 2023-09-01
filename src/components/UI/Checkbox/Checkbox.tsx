import clsx from "clsx";
import React, { memo } from "react";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
	label: string;
	name: string;
	id: string;
	value: boolean;
	className?: string;
	onHandleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onHandleClick, className }) => {
	return (
		<div className={styles.wrapper}>
			<label className={clsx(styles.label)}>{label}</label>
			<div onClick={onHandleClick} className={clsx(styles.checkbox, { [styles.done]: value }, className)} />
		</div>
	);
};

export default memo(Checkbox);
