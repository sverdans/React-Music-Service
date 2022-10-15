import React from "react";
import { useSelector } from "react-redux";

const Content = ({ children }) => {
	const { song } = useSelector(({ musicReducer }) => musicReducer);

	return (
		<div className="content container" style={{
			height: (song ? "calc(100% - 91px)" : "100%")}}>
			{children}
		</div>
	);
}
  
export default Content;