import Button from "components/UI/Button/Button";
import Checkbox from "components/UI/Checkbox/Checkbox";
import TextInput from "components/UI/TextInput/TextInput";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./SignIn.module.css";

interface SignInUserInfo {
	password: string;
	email: string;
}

type SignInUserInfoErrors = Partial<Record<keyof SignInUserInfo, string>>;

const initialValues: SignInUserInfo = {
	password: "",
	email: "",
};

const signInValidation = (values: SignInUserInfo): SignInUserInfoErrors => {
	const errors: SignInUserInfoErrors = {};

	if (!values.email) {
		errors.email = "Обязательное поле";
	}

	if (!values.password) {
		errors.password = "Обязательное поле";
	}

	return errors;
};

const SignIn: React.FC = () => {
	const [rememberFlag, setRememberFlag] = useState<boolean>(false);
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState<SignInUserInfoErrors>({});
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValues(prevValues => ({ ...prevValues, [name]: value }));
	}, []);

	const handleRememberClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		setRememberFlag(prev => !prev);
	}, []);

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();

		const errors = signInValidation(values);

		if (Object.keys(errors).length === 0) {
			setErrors({});
			setValues(initialValues);
			console.log("submit form");
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
				label="Email"
				id="email"
				name="email"
				value={values.email}
				error={!!errors.email}
				description={!!errors.email ? errors.email : ""}
				type="text"
				onChange={handleChange}
			/>
			<TextInput
				label="Пароль"
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
				label="Запомнить меня"
				value={rememberFlag}
				onHandleClick={handleRememberClick}
			/>
			<Button variant="wide" type="submit" onClick={handleSubmit}>
				Submit
			</Button>
		</form>
	);
};

export default SignIn;
