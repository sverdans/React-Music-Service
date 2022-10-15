import React from "react";

const FileInput = ({ defaultText, setFile }) => {
	const uploadButtonRef = React.useRef();

	const [text, setText] = React.useState(defaultText);
	
	const handleClick = (e) => { uploadButtonRef.current.click(); }

	return (
		<div className="file-input" onClick={handleClick}>
			<span className="file-name">{text}</span>
			<div className="upload-button-wrapper">
				<div className="upload-button" />
			</div>
			<input ref={uploadButtonRef} name="audio" type="file" className="input-hidden"
				onChange={(event) => {
					setText(event.target.files[0].name);
					setFile(event.target.files[0]);
				}} />
		</div>
	);
}

export default FileInput;