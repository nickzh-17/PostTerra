import { LocalUser } from "components/LocalUser/LocalUser";
import { OverlayContainer } from "components/OverlayContainer/OverlayContainer";
import React from "react";
import { Provider } from "react-redux";

import "reset-css";
import Router from "router";
import { store } from "store";
import "./App.css";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<OverlayContainer />
			<LocalUser />

			<Router />
		</Provider>
	);
};

export default App;
