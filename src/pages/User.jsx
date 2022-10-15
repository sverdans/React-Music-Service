import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, CardsSection } from "../components";
import { getUser } from "../api/user";

const getCorrectString = (count) =>
{
	const mod100 = count % 100;
	if (mod100 > 10 && mod100 < 20)
	{
		return "плейлистов";
	}
	else
	{
		const mod10 = count % 10
		switch (mod10)
		{
			case 1: return "плейлист"
			case 2:
			case 3: 
			case 4: return "плейлиста";
			default: return "плейлистов";
		}
	}
}

const User = () => {

	const { id } = useParams();
	const [user, setUser] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(true);
	const [playlistsCount, setPlaylistCount] = React.useState(0);
	const [addedPlaylists, setAddedPlaylists] = React.useState([]);
	const [createdPlaylists, setCreatedPlaylists] = React.useState([]);

	const getUserById = async () => {
		setIsLoading(true);
		const {user, playlists} = await getUser(id);
		
		if (user)
			setUser(user);
		
		if (playlists)
		{
			setPlaylistCount(playlists.length);
			setAddedPlaylists(playlists.filter(value => value.userId != user.id));
			setCreatedPlaylists(playlists.filter(value => value.userId == user.id));
		}
		setIsLoading(false);
	};

	React.useEffect(() => { getUserById() }, [id]);

	return (
		<div className="wide-page user-page">
			{
				!isLoading &&
				<>
					<div className="user-header">
						<Image imageStyle="playlist-image" src={user.image} shape="round" />
						<div className="user-info">
							<span className="user-name">{user?.name}</span>
							<ul className="user-stats">
								{
									playlistsCount > 0 &&
									<li>
										{playlistsCount + " " + getCorrectString(playlistsCount)}
									</li>
								}
								<li>0 подписок</li>
								<li>0 подписчиков</li>
							</ul>
						</div>
					</div>
					{
						createdPlaylists?.length > 0 &&
						<CardsSection sectionTitle="Созданные плейлисты" playlists={createdPlaylists} />
					}
					{
						addedPlaylists?.length > 0 &&
						<CardsSection sectionTitle="Добавленные плейлисты" playlists={addedPlaylists} />
					}
				</>
			}
		</div>
	)
}

export default User;