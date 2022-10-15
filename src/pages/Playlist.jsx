import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image } from "../components";
import { USER_ROTE } from "../utils/constants";
import { deletePlaylist, getPlaylist} from "../api/playlist";
import { SettingsButton, ChangePlaylistModal, Song } from "../components"
import { useDispatch, useSelector } from "react-redux";
import { setIsPause, setPlaylistSong } from "../redux/actions/music";
import { addPlaylist, removePlaylist } from "../redux/actions/user";
import { addPlaylistToLiked, removePlaylistFromLiked } from "../api/user";

const Playlist = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const removeSong = (song) => {
		const array = playlist.songs.filter(value => value.id !== song.id);
		setPlaylist({ ...playlist, songs: array });
	}
	const { user, playlists } = useSelector(({ userReducer }) => userReducer);
	const music = useSelector(({ musicReducer }) => musicReducer);

	const { id } = useParams();
	const [isLoading, setIsLoading] = React.useState(true);
	const [playlist, setPlaylist] = React.useState({});
	const [isPlaylistModalVisible, setIsPlaylistModalVisible] = React.useState(false);
	const [isAdded, setIsAdded] = React.useState(playlists.find(value => value.id == id) !== undefined);

	let author = {}
	if (playlist.users)
		author = playlist.users.find(value => value.id == playlist.userId);
	
	const onDeleteButtonClick = async () => {
		try {
			dispatch(removePlaylist(id));
			const res = await deletePlaylist(id);
			navigate(-1);
		}
		catch (e) {
			alert(e.response.data.message);
		}
	}

	const onChangeButtonClick = (e) => {
		e.stopPropagation();
		setIsPlaylistModalVisible(true);
	}
	
	const onSongClick = (songItem) => {
		if (music.playlist?.id !== playlist.id || songItem.id !== music.song?.id)
			dispatch(setPlaylistSong(playlist, songItem));
		else
			dispatch(setIsPause(!music.isPause));
	}

	const getPlaylistById = async () => {
		setIsLoading(true);
		const res = await getPlaylist(id);
		setPlaylist(res);
		setIsLoading(false);
	};

	const onAddButtonClick = async (needRemove) => {
		try
		{ 
			if (isAdded)
			{
				const res = await removePlaylistFromLiked(playlist.id);
				dispatch(removePlaylist(playlist.id));
			}
			else
			{
				const res = await addPlaylistToLiked(playlist.id);
				dispatch(addPlaylist(playlist));
			}
		}
		catch (e)
		{
			alert(e.response.data.message);
		}
	}

	React.useEffect(() => { getPlaylistById() }, [id]);

	React.useEffect(() =>
		{
			const enable = (playlists.find(value => value.id == id) !== undefined);
			setIsAdded(enable);
		}, [playlists]);

	return (
		<div className="wide-page playlist-page">
			{
				isPlaylistModalVisible &&
				<ChangePlaylistModal 
					playlist={playlist}
					setPlaylist={setPlaylist}
					setIsLoading={setIsLoading}
					setVisible={setIsPlaylistModalVisible}
				/>
			}

			{
				!isLoading &&
				<>
					<div className="playlist-header playlist-element top">
						<Image imageStyle="playlist-image" src={playlist.image} />
						<div className="playlist-info">
							<span className="playlist-title">{playlist.name}</span>
							<div className="author-info">
								<Image imageStyle="author-image" shape={"round"} src={author.image} />
								<span className="author-name" onClick={() => { navigate(USER_ROTE + '/' + author.id) }}>
									{author.name}
								</span>
							</div>
						</div>
					</div>

					<div className="playlist-container playlist-element">
						{
							user && 
							<div className="buttons-section">
								{
									(playlist.type === "DELETABLE") && (playlist.userId === user.id) &&
									<SettingsButton>
										<ul className="select-menu container">
											<li className="select-text" onClick={() => { onDeleteButtonClick() }}>Удалить плейлист</li>
											<li className="select-text" onClick={(e) => { onChangeButtonClick(e) }}>Изменить плейлист</li>
										</ul>
									</SettingsButton>
								}
									
								{
									(playlist.type === "DELETABLE") && (playlist.userId !== user.id) &&
									<span className={"icon-plus-playlist" + (isAdded ? " rotated" : "")}
										onClick={onAddButtonClick} />
								}
							</div>
						}
						<div className="songs-header">
							<span className="element index center">#</span>
							<span className="element">НАЗВАНИЕ</span>
							<span />
							<span className="element">ИСПОЛНИТЕЛЬ</span>
							<span />
							<span className="icon icon-time" />
						</div>
						
						<hr noshade="noshade" />
							{
								playlist.songs &&
								<div className="songs">
									{
										playlist.songs.map((value, index) => (
											<Song index={index + 1} songObj={value} key={value.id}
												isActive={playlist.id === music.playlist?.id && value.id === music.song?.id} isPause={music.isPause}
												onClick={onSongClick} removeSelf={removeSong} playlist={playlist}/>
										))
									}
								</div>
							}
					</div>
				</>
			}
		</div>
	)
}

export default Playlist;