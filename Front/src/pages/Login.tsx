import Login from "components/Login/Login";
import { AuthLayout } from "layouts/auth/auth-layout";

const SignInPage: React.FC = () => {
	return (
		<AuthLayout title="Login">
			<Login />
		</AuthLayout>
	);
};

export default SignInPage;
