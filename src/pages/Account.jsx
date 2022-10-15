import React from "react";
import { change } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { clearMusic } from "../redux/actions/music";
import { clearUser, updateUser } from "../redux/actions/user";
import { ImageInput } from "../components";

const Account = () => {

	const dispatch = useDispatch();
	const user = useSelector(({ userReducer }) => userReducer.user);
	const [name, setName] = React.useState(user.name);
	const [file, setFile] = React.useState(null);

	const exitButtonOnClick = () => {
		dispatch(clearUser());
		dispatch(clearMusic());
		localStorage.removeItem('token');
	};

	React.useEffect(() => { setFile(null) }, [user])
	const saveButtonOnClick = async () => {
		try
		{
			const imageUrl = file !== null ? URL.createObjectURL(file) : user.image;
			if (name === user.name && imageUrl === user.image)
				return;
			
			let data;
			const formData = new FormData();

			formData.append('name', name);

			if (imageUrl !== user.image)
				formData.append('image', file);

			data = await change(formData);
			dispatch(updateUser(data));
		}
		catch (e)
		{
			alert(e.response.data.message);
		}
	};
	
	return (
		<div className="narrow-page account-page">
			<h2 className="page-title">Данные профиля</h2>

			<span className="form-label">Фото профиля</span>

			<ImageInput defaultImage={user.image} imageShape="round" setFile={setFile} />
			
			<span className="form-label">Имя</span>
			<input type="text" name="name" className="form-input"
				value={name} onChange={e => setName(e.target.value)} />
				{
					((name != user.name) || (file !== null)) ? 
						<div className="button-group">
							<span className="button-outline" onClick={saveButtonOnClick}>Сохранить</span>
							<span className="button-outline second" onClick={exitButtonOnClick}>Выйти</span>
						</div>
						:
						<span className="button-outline" onClick={exitButtonOnClick}>Выйти</span>
				}
		</div>
	)
}

export default Account;