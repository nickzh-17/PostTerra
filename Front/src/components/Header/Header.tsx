import Logo from "components/Logo/Logo";
import Button from "components/UI/Button/Button";
import React, { useLayoutEffect } from "react";

import styles from "./Header.module.css";

import Icon from "components/Icon/Icon";
import { UserInfo } from "components/UserInfo/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "store";
import { toggleTheme } from "store/app/app.reducer";
import { getSlice } from "store/app/app.selector";
import { getUserSlice } from "store/user/user.selectors";

const Header: React.FC = () => {
	const { theme } = useSelector(getSlice);
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getUserSlice);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		document.body.dataset.theme = theme;
	}, [theme]);

	const handleCreatePost = () => {
		navigate("/posts/create");
	};

	const handleChangeTheme = () => {
		dispatch(toggleTheme());
	};

	return (
		<div className={styles.header}>
			<Logo />

			<div className={styles.controls}>
				{!window.location.href.includes("/posts/create") && (
					<Button className={styles.createPost} variant="icon" onClick={handleCreatePost}>
						<Icon type="createIcon" />
					</Button>
				)}
				{user && <UserInfo user={user} />}
				<Button className={styles.themeSwitcher} variant="icon" onClick={handleChangeTheme}>
					<Icon type={theme === "dark" ? "themeLight" : "themeDark"} />
				</Button>
			</div>
		</div>
	);
};

export default Header;
