import Registration from "components/Registration/Registration";
import { AuthLayout } from "layouts/auth/auth-layout";

const RegistrationPage: React.FC = () => {
	return (
		<AuthLayout title="Registration">
			<Registration />
		</AuthLayout>
	);
};

export default RegistrationPage;
