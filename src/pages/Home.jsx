import React from "react";
import { getAllPlaylists } from "../api/playlist";
import { CardsSection } from "../components"

const Home = () => {

	const [sectionAll, setSectionAll] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const getSectionAll = async () => {
		setIsLoading(true);
		const playlists = await getAllPlaylists();
		setSectionAll(playlists);
		setIsLoading(false);
	}

	React.useEffect(() => { getSectionAll(); }, []);

	return (
		<div className="wide-page home-page">
			<h2 className="page-title">Главная</h2>
			{
				!isLoading &&
				<CardsSection sectionTitle="Все плейлисты" playlists={sectionAll}></CardsSection>
			}
		</div>
	)
}

export default Home;