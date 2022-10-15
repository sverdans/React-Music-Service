import React from "react";

const ImageInput = ({ defaultImage, setFile, style="", imageShape = ""}) => {
	const uploadButtonRef = React.useRef();

	const [image, setImage] = React.useState(defaultImage);
	
	const handleClick = (e) => { uploadButtonRef.current.click(); }

	return (
		<div className="input-image-container">

			<div className={"image-block " + style}>
				<div className="image-block-inner">
					<img className={"image " + imageShape} src={image} />
					<span className="input-button" onClick={handleClick}>Выбрать фото</span>
				</div>
			</div>

			<input ref={uploadButtonRef} name="image" type="file" className="input-hidden"
				onChange={(event) => {
					setImage(URL.createObjectURL(event.target.files[0]));
					setFile(event.target.files[0]);
				}} />
		</div>
	);
}

export default ImageInput;