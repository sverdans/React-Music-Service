import React from "react";
import { PLAYLIST_ROUTE } from "../utils/constants";
import { useNavigate } from "react-router-dom"
import Image from "./Image";

const Card = ({ playlist }) => {
	const navigate = useNavigate();

	const onCardClick = () => {
		navigate(PLAYLIST_ROUTE + '/' + playlist.id);
	};

	let author = {};

	if (playlist.users)
		author = playlist.users.find(value => value.id == playlist.userId);
	
	return (
		<div className="playlist-card" onClick={onCardClick}>
			<Image imageStyle="card-image" src={playlist.image} />
			
			<div className="info-wrapper">
				<span className="playlist-name">{playlist.name}</span>
				<span className="playlist-author">
					{
						playlist.users ? (author.name) : ""
					}
				</span>
			</div>
		</div>
	);
}

export default Card;