import React from "react";
import { Modal, ImageInput} from "../"
import { changePlaylist } from "../../api/playlist";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePlaylist } from "../../redux/actions/user";

const ChangePlaylistModal = ({ setVisible, playlist, setPlaylist, setIsLoading }) => {

	const dispatch = useDispatch();
	const [name, setName] = React.useState(playlist.name);
	const [file, setFile] = React.useState(null);
	const { id } = useParams();

	const onSaveButtonClick = async () => {

		if (name === playlist.name && !file)
			return;
		
		setIsLoading(true);
		try
		{
			const formData = new FormData();
			
			formData.append('name', name);

			if (file)
				formData.append('image', file);

			const res = await changePlaylist(id, formData);
			dispatch(updatePlaylist(res));
			setPlaylist(res);
			setVisible(false);
		}
		catch (e)
		{
			alert(e.response.data.message);
		}
		setIsLoading(false);
	}

	return (
		<Modal setIsVisible={setVisible} width={400} title="Изменить плейлист">
			<span className="form-label">Обложка</span>
			<ImageInput defaultImage={playlist.image} setFile={setFile} style="default" />
			<span className="form-label">Название</span>
			<input type="text" name="name" className="form-input"
				value={name} onChange={e => setName(e.target.value)} />
			<span className="button-outline" onClick={onSaveButtonClick}>Сохранить</span>
		</Modal>
	);
}

export default ChangePlaylistModal;
