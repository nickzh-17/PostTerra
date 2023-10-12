import Button from "components/UI/Button/Button";
import TextInput from "components/UI/TextInput/TextInput";
import Typography from "components/UI/Typography/Typography";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

import { useFormik } from "formik";
import { AppDispatch } from "store";
import { registrationThunk } from "store/user/user.actions";
import { getUserSlice } from "store/user/user.selectors";
import { RegistrationParams } from "types/api-types/request";
import styles from "./Registration.module.css";

interface RegistrationValues extends RegistrationParams {
	confirmPassword: string;
}

const initialValues: RegistrationValues = {
	username: "",
	password: "",
	email: "",
	confirmPassword: "",
};

const validationSchema = yup.object<RegistrationValues>().shape({
	username: yup
		.string()
		.required("required field")
		.min(6, "no shorter than 6 characters")
		.max(16, "no longer than 16 characters")
		.matches(/^(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_])$/, "has incorrect characters"),
	email: yup.string().required("required field").email("incorrect email"),
	password: yup
		.string()
		.required("required field")
		.matches(/^[A-Za-z0-9]+$/, "only latin, numbers")
		.min(8, "no shorter than 8 characters")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, "1 lowercase, 1 uppercase, 1 number")
		.max(20, "no longer than 20 characters"),

	confirmPassword: yup
		.string()
		.required("required field")
		.test("passworw-confirmation", "must match", function (value) {
			return this.parent.password === value;
		}),
});

const Registration: React.FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { isUserLoading } = useSelector(getUserSlice);

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
		initialValues: initialValues,
		validationSchema,
		onSubmit: (data, { resetForm }) => {
			console.log(data);
			dispatch(registrationThunk({ username: data.username, email: data.email, password: data.password }));
			// TODO - dont reset if server error
			resetForm();
		},
	});

	// 	dispatch(registrationThunk({ username: values.username, email: values.email, password: values.password }))
	// 		.unwrap()
	// 		.then(payload => {
	// 			if (!hasRegistrationError(payload)) {
	// 				setErrors({});
	// 				//setValues(initialValues);
	// 				return;
	// 			}
	// 		});

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<TextInput
				ref={inputRef}
				label="username"
				id="username"
				name="username"
				value={values.username}
				error={touched.username && !!errors.username}
				description={touched.username && !!errors.username ? errors.username : ""}
				type="text"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextInput
				label="email"
				id="email"
				name="email"
				value={values.email}
				error={touched.email && !!errors.email}
				description={touched.email && !!errors.email ? errors.email : ""}
				type="text"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextInput
				label="password"
				id="password"
				name="password"
				value={values.password}
				error={touched.password && !!errors.password}
				description={touched.password && !!errors.password ? errors.password : ""}
				type="password"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextInput
				label="confirm password"
				id="confirmPassword"
				name="confirmPassword"
				value={values.confirmPassword}
				error={touched.confirmPassword && !!errors.confirmPassword}
				description={touched.confirmPassword && !!errors.confirmPassword ? errors.confirmPassword : ""}
				type="password"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<Button variant="clear" disabled={isUserLoading} type="submit" style={{ marginBottom: "20px" }}>
				Register
			</Button>
			<NavLink to={`/auth/login`}>
				<Typography variant="span">login</Typography>
			</NavLink>
		</form>
	);
};

export default Registration;
