import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsPause, setNextSong, setOnEnd, setPrevSong, setSongTime } from "../redux/actions/music";
import { addLike, removeLike } from "../redux/actions/user";
import { addInLiked, removeFromLiked } from "../api/playlist";
import { PLAYLIST_ROUTE } from "../utils/constants";
import { Image } from "../components";

function intToTime(duration)
{
	const minutes = Math.floor(duration / 60);
	const seconds =  Math.floor(duration % 60);
	return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

const Player = () =>
{
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const progressBarRef = React.useRef();

	const { likes, user } = useSelector(({ userReducer }) => userReducer);
	const { song, playlist, audio, isPause } = useSelector(({ musicReducer }) => musicReducer);

	const [time, setTime] = React.useState(0);
	const [isAdded, setIsAdded] = React.useState(likes.includes(song?.id));

	const onImageClick = () => {
		playlist &&
		navigate(PLAYLIST_ROUTE + '/' + playlist.id);
	};

	const onPlayPauseButtonClick = () => { dispatch(setIsPause(!isPause)) }
	const onNextSongClick = () => { dispatch(setNextSong()) }
	const onPrevSongClick = () => { dispatch(setPrevSong()) }
	const onProgressBarClick = ({ clientX }) =>
	{
		const x = clientX - progressBarRef.current.offsetLeft;
		dispatch(setSongTime(x / progressBarRef.current.offsetWidth * 100));
	}

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

	React.useEffect(() =>
	{
		setIsAdded(likes.includes(song?.id))
	}, [likes]);

	React.useEffect(() => {
		setIsAdded(likes.includes(song?.id))
		const interval = setInterval(() => {
			if (audio)
			{
				!isPause && setTime(audio.seek());
				if (audio.state() === "loaded" && audio.seek() + 1 >= audio._duration)
				{
					dispatch(setNextSong());
				}
			}
		}, 1000);
		return () => { clearInterval(interval) };
	}, [audio]);

	return (
		<div className="player" style={{
			height: (song ? "91px" : "0px")
		}}>
			
			<Image imageStyle={"player-image" + (song ? "" : " close")}
				src={(song ? song.image : "default-music.svg")}
				onClick={onImageClick}/>
			
			<div className="player-left-part">
				<div className="active-song-info">
					<span className="active-song-name">{song && song.name}</span>
					<span className="active-author-name">{song && song.author}</span>
				</div>
				{
					user ? 
						<div className="icon-wrapper">
							<div className={"icon-plus" + (isAdded ? " rotated" : "")}
							onClick={onAddButtonClick} />
						</div>
						:
						<></>
				}
				
			</div>
			
			<div className="player-middle-part">
				<div className="media-buttons">
					<div className="media-button prev-song-button" onClick={onPrevSongClick}/>
					<div className={"media-button " + (isPause ? "play-song-button" : "pause-song-button")}
						onClick={onPlayPauseButtonClick}/>
					<div className="media-button next-song-button" onClick={onNextSongClick}/>
				</div>
				<div className="progress-container">
					<div className="time end">
						{intToTime(time)}
					</div>

					<div ref={progressBarRef} className="media-progress" onClick={(e) => onProgressBarClick(e)}>
						<div className="progress-bar" style={{ width: audio ? (time / audio._duration * 100) + "%" : "0%"}}>
							<div className="circle" />
						</div>
					</div>

					<div className="time start">
						{audio && intToTime(audio._duration)}
					</div>
				</div>
			</div>
			
			<div className="player-right-part">

			</div>
		</div>
	);
}

export default Player;