import React from "react";

const Modal = ({ setIsVisible, children, title, width = 500}) => {
	const modalRef = React.useRef();

	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());

		if (!path.includes(modalRef.current)) {
			setIsVisible(false);
			return;
		}
	};

	React.useEffect(() => {
		modalRef.current.click();
		document.addEventListener("mousedown", handleOutsideClick);
		return function cleanup() {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []
	);

	return (
		<div className="modal">
			<div className="modal-container container" style={{maxWidth: width}}>
				<div ref={modalRef} className="modal-card container">
					<div className={"modal-inner"}>
						<div className="modal-header">
							<span className="modal-title">{title}</span>
							<div className="xmark-button" onClick={() => { setIsVisible(false) }}></div>
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;