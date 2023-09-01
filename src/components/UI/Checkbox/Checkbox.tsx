import clsx from "clsx";
import React, { memo } from "react";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
	label: string;
	name: string;
	value: boolean;
	className?: string;
	onChange: (e: React.MouseEvent) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, value, onChange, className }) => {
	return (
		<div className={styles.wrapper}>
			<label className={clsx(styles.label)}>{label}</label>
			<div onClick={onChange} className={clsx(styles.checkbox, { [styles.done]: value }, className)} />
		</div>
	);
};

export default memo(Checkbox);
