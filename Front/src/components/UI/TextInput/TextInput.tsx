import clsx from "clsx";
import React, { forwardRef, memo } from "react";

import styles from "./TextInput.module.css";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: boolean;
	description?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, error, description, ...inputProps }, ref) => {
	return (
		<div className={styles.wrapper}>
			<label className={clsx(styles.label, { [styles.error]: error })} htmlFor={inputProps.id}>
				{label}
			</label>
			<input
				ref={ref}
				{...inputProps}
				className={clsx(styles.input, { [styles.error]: error }, inputProps.className)}
			/>
			{!!description && <p className={clsx(styles.description, { [styles.error]: error })}>{description}</p>}
		</div>
	);
});

export default memo(TextInput);
