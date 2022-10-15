import React from "react";

const Image = ({ src, onClick, imageStyle = "", shape = ""}) => {
	return (
		<div className={"image-block " + imageStyle}>
			<div className="image-block-inner" onClick={onClick}>
				<img className={"image " + shape} src={src}/>
			</div>
		</div>
	);
}

export default Image;