import React from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../api/playlist";
import { getLibrary } from "../api/user";
import { Card, SongUploadModal } from "../components"
import { addPlaylist } from "../redux/actions/user";

const categories = ["Плейлисты", "Подписки", "Подписчики"];

const Library = () => {
	const dispatch = useDispatch(); 

	const [isLoading, setIsLoading] = React.useState(true);
	const [playlists, setPlaylists] = React.useState([]);
	const [currentCategory, setCurrentCategory] = React.useState(categories[0]); 
	const [isAddAudioModalVisible, setIsAddAudioModalVisible] = React.useState(false);

	const onAddPlaylistButtonClick = async () => {
		try
		{
			setIsLoading(true);
			const newPlaylist = await createPlaylist("Новый плейлист");
			let array = [newPlaylist];
			dispatch(addPlaylist(newPlaylist));
			setPlaylists(playlists.concat(array));
			setIsLoading(false);
		}
		catch (e)
		{
			alert(e.response.data.message);
		}
	};

	const getUserLibrary = async () => {
		setIsLoading(true);
		const res = await getLibrary();
		setPlaylists(res.playlists);
		setIsLoading(false);
	};

	React.useEffect(() => { getUserLibrary() }, []);

	return (
		<div className="wide-page library-page">
			{
				isAddAudioModalVisible &&
				<SongUploadModal setVisible={setIsAddAudioModalVisible}/>
			}

			<div className="library-page-header">
				<div className="categories">
					{
						categories.map((value, index) => (
							<span key={value + index}
								className={"category-button" + (value == currentCategory ? " active" : "")}
								/*onClick={()=>{setCurrentCategory(value)}}*/>
								{value}
							</span>
						))
					}
				</div>
				<div className="buttons">
					<span className="button-outline" onClick={() => { onAddPlaylistButtonClick() }}>
						Создать плейлист
					</span>
					<span className="button-outline" onClick={() => { setIsAddAudioModalVisible(true) }}>
						Загрузить аудио
					</span>
				</div>
			</div>

			<h2 className="page-title">{currentCategory}</h2>
			<div className="library-section">
				{
					!isLoading && playlists &&
					playlists.map((value) => (
						<Card playlist={value} key={value.id} />
					))
				}
			</div>
		</div>
	)
}

export default Library;