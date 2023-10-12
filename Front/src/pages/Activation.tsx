import { AuthLayout } from "layouts/auth/auth-layout";
import ActivateUser from "../components/ActivateUser/ActivateUser";

const ActivatePage = () => {
	return (
		<AuthLayout title="Account activation">
			<ActivateUser />
		</AuthLayout>
	);
};

export default ActivatePage;
