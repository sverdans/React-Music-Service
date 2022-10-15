import React from "react";
import { Modal, ImageInput, FileInput} from "../"
import { changeSong, createSong } from "../../api/song";

const ChangeSongModal = ({ setVisible, song, setSong}) => {

	const [name, setName] = React.useState(song.name);
	const [author, setAuthor] = React.useState(song.author);
	const [songImageFile, setSongImageFile] = React.useState(null);

	const onChangeButtonClick = async () => {
		try {
			const formData = new FormData();
	
			formData.append("name", name);
			formData.append("author", author);
			
			if (songImageFile)
				formData.append("image", songImageFile);
			
			const res = await changeSong(song.id, formData);
			setVisible(false);
			setSong(res);
		}
		catch (e) {
			alert(e.response.data.message);
		}
	};

	return (
		<Modal setIsVisible={setVisible} width={400} title="Изменить аудио">
				<span className="form-label">Обложка</span>
				<ImageInput setFile={setSongImageFile} defaultImage={song.image} style="default" />
				<span className="form-label">Название</span>
				<input type="text" name="name" className="form-input"
					value={name} onChange={e => setName(e.target.value)} />
				<span className="form-label">Исполнитель</span>
				<input type="text" name="name" className="form-input"
					value={author} onChange={e => setAuthor(e.target.value)} />

				<span className="button-outline" onClick={() => { onChangeButtonClick() }}>Сохранить</span>
		</Modal>
	);
}

export default ChangeSongModal;
