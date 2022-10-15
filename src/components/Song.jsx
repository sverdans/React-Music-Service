import React from "react";
import { Image, SettingsButton, ChangeSongModal, Select } from "./"
import { deleteSong } from "../api/song";
import { useDispatch, useSelector } from "react-redux";
import { addInLiked, addSong, removeFromLiked, removeSong } from "../api/playlist";
import { addLike, removeLike } from "../redux/actions/user";
import { Howl } from "howler";

function intToTime(duration)
{
	const minutes = Math.floor(duration / 60);
	const seconds =  Math.floor(duration % 60);
	return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

const Song = ({ songObj, index, onClick, isActive, isPause, removeSelf, playlist}) => {
	
	const songRef = React.useRef();
	const { user, likes, playlists } = useSelector(({ userReducer }) => userReducer);
	const dispatch = useDispatch();

	const [song, setSong] = React.useState(songObj);
	const [isInFocus, setIsInFocus] = React.useState(false);
	const [isAdded, setIsAdded] = React.useState(likes.includes(song.id));
	const [isSongModalVisible, setIsSongModalVisible] = React.useState(false);
	const [length, setLength] = React.useState(0);

	const onAddButtonClick = async () => {
		if (isAdded)
		{
			await removeFromLiked(song.id);
			dispatch(removeLike(song.id));
		}
		else
		{
			await addInLiked(song.id);
			dispatch(addLike(song.id));
		}
	};
	
	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		if (!path.includes(songRef.current))
			setIsInFocus(false);
	};

	const onDeleteButtonClick = async () => {
		try
		{
			await deleteSong(song.id);
			removeSelf(song);
		}
		catch (e) { alert(e.response.data.message) }
	}

	const addSongInPlaylist = async (playlistId, songId) => {
		try
		{ 
			await addSong(playlistId, songId);
		}
		catch (e) { alert(e.response.data.message) }
	}

	const removeSongFromPlaylist = async (playlistId, songId) => {
		try
		{
			await removeSong(playlistId, songId);
			removeSelf(song);
		}
		catch (e) { alert(e.response.data.message) }

	}

	React.useEffect(() =>
		{
			const enable = likes.includes(song.id);
			setIsAdded(enable);
		}, [likes]);

	React.useEffect(() => {

		const audio = new Howl({
			src: song.audio,
			html5: true,
			preload: 'metadata',
			onload: () => {  setLength(audio._duration)}
		});

		document.addEventListener('click', handleOutsideClick);
		return function cleanup() {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []
);

	return (
		<div className={"song-container" + (isInFocus ? " in-focus" : "")} ref={songRef} onClick={() => { setIsInFocus(true)}}>
			<span className={"hide icon " + ( !isActive ? "icon-play" : (isPause ? "icon-play" : "icon-pause"))}
				onClick={() => { onClick(song); }} />
			{
				isSongModalVisible &&
				<ChangeSongModal
					setVisible={setIsSongModalVisible}
					song={song}
					setSong={setSong}
				/>
			}

			{
				isActive ? 
					(
						isPause?
							<span className="element index center active">{index}</span>
							:
							<span className={"icon icon-active" + (isPause ? " stop" : "")} />
					)
				:
					<span className="element index center">{index}</span>
			}

			<Image src={song.image} />
			<span className={"element " + (isActive ? "active" : "bright")}>{song.name}</span>
			<span className="element">{song.author}</span>

			{
				user ? 
					<div>
						<span className={"icon icon-plus" + (isAdded ? " active" : "")} onClick={onAddButtonClick} />
					</div>
					:
					<div></div>
			}
			

			<span className="element">{intToTime(length)}</span>
			<span className="hide">
				{
					user && 
					<SettingsButton size="20px">
						<ul className="select-menu container transform-left">
							{
								(song.userId === user.id) &&
								<>
									<li className="select-text" onClick={onDeleteButtonClick}>Удалить</li>
									<li className="select-text" onClick={() => { setIsSongModalVisible(true) }}>Изменить</li>
								</>
							}
							{
									playlists &&
									playlists.map((value) => {
										if (playlist.id != value.id && value.userId == user.id)
											return (
												<li className="select-text" onClick={() => { addSongInPlaylist(value.id, song.id) }} key={value.id}>
													{"Добавить в \"" + value.name + "\""}
												</li>)
									})
							}
							{
								(playlist.type === "DELETABLE" && user.id === playlist.userId) && 
								<li className="select-text" onClick={() => { removeSongFromPlaylist(playlist.id, song.id) }}>
									Удалить из плейлиста
								</li>
							}	
						</ul>
					</SettingsButton>
				}
			</span>
		</div>
	);
}

export default Song;
