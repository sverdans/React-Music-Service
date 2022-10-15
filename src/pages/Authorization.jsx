import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, registration } from "../api/user";
import { setUser } from "../redux/actions/user";
import { HOME_ROUTE } from "../utils/constants";

const Authorization = () =>
{
	const dispatch = useDispatch();
	const onHeaderClick = (index) => { setActiveAuthType(index); };

	let navigate = useNavigate();

	const [activeAuthType, setActiveAuthType] = React.useState(0);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [repeatedPassword, setRepeatedPassword] = React.useState('');

	const onButtonClick = async () =>
	{
		try
		{
			let data;
			if (activeAuthType === 0)
				data = await registration(name, email, password, repeatedPassword);
			else
				data = await login(email, password);

			dispatch(setUser(data));
			navigate(HOME_ROUTE);
		}
		catch (e)
		{
			alert(e.response.data.message)
		}
	}

	return (
		<div className="narrow-page auth-page">
			<div className="header-wrapper">
				<span className={"auth-type-title first" + (activeAuthType === 0 ? " active" : "")}
					onClick={() => onHeaderClick(0)}>
					Регистрация
				</span>
				<span className={"auth-type-title second" + (activeAuthType === 1 ? " active" : "")}
					onClick={() => onHeaderClick(1)}>
					Войти
				</span>
			</div>

			<form className="auth-form">
			
				{
					activeAuthType === 0 ?
					<div className="auth-form">
						<span className="form-label">Имя</span>
						<input type="text" name="name" className="form-input"
							value={name} onChange={e => setName(e.target.value)} />
					</div>
						: null
				}
						
				<span className="form-label">Почта</span>
				<input type="text" name="email" className="form-input"
					value={email} onChange={e => setEmail(e.target.value)}/>
					
				
				<span className="form-label">Пароль</span>
				<input type="text" name="password" className="form-input"
					value={password} onChange={e => setPassword(e.target.value)}/>

				{
					activeAuthType === 0 ?
					<div className="auth-form">
						<span className="form-label">Повторите пароль</span>
						<input type="text" name="repeatPassword" className="form-input"
							value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)}/>
						<span className="button-outline" onClick={onButtonClick}>Зарегистрироваться</span>
					</div>
						:
					<span className="button-outline" onClick={onButtonClick}>Войти</span>
				}
			</form>
		</div>
	)
}

export default Authorization;