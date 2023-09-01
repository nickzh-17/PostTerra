import React, { useState } from "react";

import SignInPage from "pages/SignIn";
import "reset-css";
import "./App.css";

export const App: React.FC = () => {
	const [value, setValue] = useState<boolean>(false);

	const onToggleCheckbox = (e: React.MouseEvent) => {
		setValue(prev => !prev);
	};

	return (
		<div className="App">
			<SignInPage />
		</div>
	);
};

export default App;
