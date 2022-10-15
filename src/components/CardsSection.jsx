import React from "react";
import Card from "./Card"

import { useNavigate } from "react-router-dom";
import { CATEGORY_ROUTE } from "../utils/constants";

const CardsSection = ({ sectionTitle, playlists }) => {

	const navigate = useNavigate();

	const showCategory = () => {
		navigate(CATEGORY_ROUTE, {
			state: {
				playlists: playlists,
				title: sectionTitle
			}
		});
	};

	return (
		<div>
			<div className="cards-section-header">
				<span className="section-title" onClick={showCategory}>{sectionTitle}</span>
				<span className="section-link" onClick={showCategory}>все</span>
			</div>
			
			<div className="cards-section">
				{
					playlists &&
					playlists.map((value) => (
						<Card playlist={value} key={value.id} />
					))
				}
			</div>
		</div>
	);
}
  
export default CardsSection;