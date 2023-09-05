import React from "react";
import { Provider } from "react-redux";

import "reset-css";
import Router from "router";
import { store } from "store";
import "./App.css";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
};

export default App;
