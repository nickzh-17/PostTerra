import clsx from "clsx";
import Button from "components/UI/Button/Button";
import Typography from "components/UI/Typography/Typography";
import React from "react";
import { LogStatus } from "types/unions";
import styles from "./Popup.module.css";

interface PopupProps {
	message: string;
	logType: LogStatus;
	eventType: string;
	onClick: (e: React.MouseEvent) => void;
}

export const Popup: React.FC<PopupProps> = ({ message, logType, eventType, onClick }) => {
	return (
		<div className={clsx(styles.popup, styles[logType])}>
			<Typography color={logType}>{eventType}</Typography>
			<Typography color="primary">{message}</Typography>
			<Button className={styles.button} variant="standard" onClick={onClick}>
				Закрыть
			</Button>
		</div>
	);
};
