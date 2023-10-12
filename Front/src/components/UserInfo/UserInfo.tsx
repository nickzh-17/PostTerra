import clsx from "clsx";
import Icon from "components/Icon/Icon";
import Button from "components/UI/Button/Button";
import Typography from "components/UI/Typography/Typography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "store";
import { logoutThunk } from "store/user/user.actions";
import { UserDto } from "types/user";
import styles from "./UserInfo.module.css";

interface UserInfoProps {
	user: UserDto;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const handleLogoutClick = () => {
		dispatch(logoutThunk());
	};

	return (
		<div className={styles.container}>
			<Button className={styles.themeSwitcher} variant="icon" onClick={() => setIsOpened(prev => !prev)}>
				<Icon type="account" />
			</Button>
			<div className={clsx(styles.body, { [styles.isOpened]: isOpened })}>
				<Typography>{user.username}</Typography>
				<Link to="/user">
					<Button variant="clear">
						<Typography variant="h3">My Account</Typography>
					</Button>
				</Link>
				<Button variant="clear" onClick={handleLogoutClick}>
					<Typography variant="h3">Logout</Typography>
				</Button>
			</div>
		</div>
	);
};
