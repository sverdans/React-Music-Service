import React from "react";
import { Modal, ImageInput, FileInput} from "../"
import { createSong } from "../../api/song";

const SongUploadModal = ({setVisible}) => {

	const [name, setName] = React.useState("");
	const [author, setAuthor] = React.useState("");
	const [songImageFile, setSongImageFile] = React.useState(null);
	const [songAudioFile, setSongAudioFile] = React.useState(null);

	const onCreateButtonClick = async () => {
		try
		{
			const formData = new FormData();
	
			formData.append("name", name);
			formData.append("author", author);
			formData.append("audio", songAudioFile);
			
			if (songImageFile)
				formData.append("image", songImageFile);
			
			const res = await createSong(formData);
			setVisible(false);
		}
		catch (e)
		{
			alert(e.response.data.message);
		}
	};

	return (
		<Modal setIsVisible={setVisible} width={600} title="Загрузить аудио">
			<div className="audio-modal">
				<div className="column flex-start">
					<span className="form-label">Обложка</span>
					<ImageInput setFile={setSongImageFile} style="default"
						defaultImage="https://res.cloudinary.com/dptpndco5/image/upload/v1659981556/images/const/default-music_bkn4mo.svg"/>
				</div>
				<div className="column">
					<span className="form-label">Название</span>
					<input type="text" name="name" className="form-input"
						value={name} onChange={e => setName(e.target.value)} />
					<span className="form-label">Исполнитель</span>
					<input type="text" name="name" className="form-input"
						value={author} onChange={e => setAuthor(e.target.value)} />
					<span className="form-label">Файл</span>
					<FileInput setFile={setSongAudioFile} defaultText="Файл не выбран" />

					<span className="button-outline" onClick={() => { onCreateButtonClick() }}>Добавить</span>
				</div>
			</div>
		</Modal>
	);
}

export default SongUploadModal;
