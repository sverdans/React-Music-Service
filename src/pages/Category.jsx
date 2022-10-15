import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../components";

const Category = () => {

    const {state} = useLocation();
    const { playlists, title } = state || {};

	return (
        <div className="wide-page category-page">
            <h2 className="page-title">{title}</h2>
            
			<div className="category-section">
				{
					playlists &&
					playlists.map((value) => (
						<Card playlist={value} key={value.id} />
					))
				}
			</div>
		</div>
	)
}

export default Category;