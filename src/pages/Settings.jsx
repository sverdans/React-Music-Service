import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Select } from '../components';
import { setTheme } from '../redux/actions/theme';
import { colorItems } from '../utils/constants';

const languageItems = [
	{
		name: "русcкий (russian)",
		id: "russian"
	}
];

const Settings = () => {
	const dispatch = useDispatch();
	const theme = useSelector(({ themeReducer }) => themeReducer.theme);

	return (
		<div className="narrow-page settings-page">
			<h2 className="page-title">Настройки</h2>
			<span className="form-label">Цветовая тема</span>
			<div className="setting-container">
				<p className="setting-description">Выберите цветовую тему.</p>
				<Select items={colorItems}
					onSelectItemClick={(theme) => { dispatch(setTheme(theme)); }}
					initialItem={colorItems.findIndex((item) => item.id === theme)} />
			</div>
			<span className="form-label">Язык</span>
			<div className="setting-container">
				<p className="setting-description">Выберите язык.</p>
				<Select items={languageItems} />
			</div>
		</div>
	)
}

export default Settings;