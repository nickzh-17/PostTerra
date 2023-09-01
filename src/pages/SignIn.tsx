import SignIn from "components/SignIn/SignIn";
import { AuthLayout } from "layouts/auth/auth-layout";

const SignInPage: React.FC = () => {
	return (
		<AuthLayout title="Вход">
			<SignIn />
		</AuthLayout>
	);
};

export default SignInPage;
