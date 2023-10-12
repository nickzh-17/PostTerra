import Button from "components/UI/Button/Button";
import Checkbox from "components/UI/Checkbox/Checkbox";
import TextInput from "components/UI/TextInput/TextInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { AppDispatch } from "store";
import { loginThunk } from "store/user/user.actions";
import { getUserSlice } from "store/user/user.selectors";

import Typography from "components/UI/Typography/Typography";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

interface LoginUserInfo {
	password: string;
	username: string;
}

type LoginUserInfoErrors = Partial<Record<keyof LoginUserInfo, string>>;

const initialValues: LoginUserInfo = {
	password: "",
	username: "",
};

const LoginValidation = (values: LoginUserInfo): LoginUserInfoErrors => {
	const errors: LoginUserInfoErrors = {};

	if (!values.username) {
		errors.username = "Required field";
	}

	if (!values.password) {
		errors.password = "Required field";
	}

	return errors;
};

const Login: React.FC = () => {
	const [rememberFlag, setRememberFlag] = useState<boolean>(false);
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState<LoginUserInfoErrors>({});
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { isUserLoading } = useSelector(getUserSlice);
	const navigate = useNavigate();

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValues(prevValues => ({ ...prevValues, [name]: value }));
	}, []);

	const handleRememberClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		setRememberFlag(prev => !prev);
	}, []);

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();

		const errors = LoginValidation(values);

		if (Object.keys(errors).length === 0) {
			dispatch(loginThunk(values));
			// .unwrap()
			// .then(() => {
			// 	// navigate("/");
			// });
		} else {
			setErrors(errors);
		}
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<form className={styles.form}>
			<TextInput
				ref={inputRef}
				label="username"
				id="username"
				name="username"
				value={values.username}
				error={!!errors.username}
				description={!!errors.username ? errors.username : ""}
				type="text"
				onChange={handleChange}
			/>
			<TextInput
				label="password"
				id="password"
				name="password"
				value={values.password}
				error={!!errors.password}
				description={!!errors.password ? errors.password : ""}
				type="password"
				onChange={handleChange}
			/>
			<Checkbox
				id="remember"
				name="remember"
				label="remember me"
				value={rememberFlag}
				onHandleClick={handleRememberClick}
			/>
			<Button variant="clear" type="submit" onClick={handleSubmit} style={{ marginBottom: "20px" }}>
				Login
			</Button>
			<NavLink to={`/auth/registration`}>
				<Typography variant="span">registration</Typography>
			</NavLink>
		</form>
	);
};

export default Login;
