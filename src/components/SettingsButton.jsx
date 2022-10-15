import React from "react";

const SettingsButton = ({ children, size = "40px" }) => {
	const [visibleMenu, setVisibleMenu] = React.useState(false);
	const buttonRef = React.useRef();

	const buttonOnClick = () => {
		setVisibleMenu(!visibleMenu);
	};
	
	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		if (!path.includes(buttonRef.current))
			setVisibleMenu(false);
	};

	React.useEffect(() => {
			document.addEventListener('click', handleOutsideClick);
			return function cleanup() {
				document.removeEventListener('click', handleOutsideClick);
			};
		}, []
	);
	
	return (
		<div className="settings-button-container">
			<div ref={buttonRef} className={"settings-button" + (visibleMenu ? " rotated" : "")}
				style={{ width: size, height: size }}
				onClick={buttonOnClick} />
			{
				visibleMenu &&
				children
			}
		</div>
	);
}

export default SettingsButton;