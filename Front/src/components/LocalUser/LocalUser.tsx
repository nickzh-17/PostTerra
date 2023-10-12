import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { checkAuthThunk } from "store/user/user.actions";

export const LocalUser: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(checkAuthThunk());
	}, []);

	return <></>;
};
