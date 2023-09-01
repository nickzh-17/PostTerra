import Button from "components/UI/Button/Button";
import Checkbox from "components/UI/Checkbox/Checkbox";
import TextInput from "components/UI/TextInput/TextInput";
import { AuthLayout } from "layouts/auth/auth-layout";
import React, { useState } from "react";

import sv from "components/UI/Checkbox/img/done.svg";

import "reset-css";
import "./App.css";

export const App: React.FC = () => {
	const [value, setValue] = useState<boolean>(false);

	const onToggleCheckbox = (e: React.MouseEvent) => {
		setValue(prev => !prev);
	};

	return (
		<div className="App">
			<AuthLayout title="Вход">
				<TextInput label="Имя пользователя" />
				<TextInput error={true} label="Пароль" />
				<TextInput description="Почта должна содержать @" label="Почта" />
				<Checkbox label="Запомнить меня" name="remember" value={value} onChange={onToggleCheckbox} />
				<Button variant="icon" color="secondary">
					<img src={sv} alt="check" />
				</Button>
				<Button variant="icon">
					<img src={sv} alt="check" />
				</Button>
				<Button disabled={true}>Войти</Button>
				<Button>Войти</Button>
				<Button color="secondary">Войти</Button>
				<Button variant="wide">Войти</Button>
				<Button variant="wide" color="secondary">
					Войти
				</Button>
			</AuthLayout>
		</div>
	);
};

export default App;
