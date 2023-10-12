import AuthApi from "api/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { ActivateUserBody, activateUser } from "../../api/auth/activateUser";
import Typography from "components/UI/Typography/Typography";

const ActivateUser: React.FC = () => {
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();
	const params = useParams<{
		link: string;
	}>();

	useEffect(() => {
		if (!params.link) return;

		AuthApi.activate(params.link)
			.then(res => {
				console.log(res);
				// navigate("/sign-in");
			})
			.catch(err => {
				const message = Object.values(err.response.data).join(" ");
				setErrorMessage(message);
			});
	}, [navigate, params]);

	if (errorMessage) {
		return <Typography variant="h2">{errorMessage || `Активируем...`}</Typography>;
	}

	return null;
};

export default ActivateUser;
