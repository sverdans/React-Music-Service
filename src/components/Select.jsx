import React from "react";

const Select = ({ items, onSelectItemClick, initialItem }) => {
	const [activeItem, setActiveItem] = React.useState(initialItem || 0);
	const [visibleMenu, setVisibleMenu] = React.useState(false);
	const selectRef = React.useRef();

	const onSelectItem = (index) => {
		setActiveItem(index);
		setVisibleMenu(false);
		onSelectItemClick(items[index].id);
	};

	const selectBarOnClick = () => {
		setVisibleMenu(!visibleMenu);
	};
	
	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		if (!path.includes(selectRef.current))
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
		<div ref={selectRef} className="select">
			<div className="select-bar" onClick={selectBarOnClick}>
				<span className="select-text">{items[activeItem].name}</span>
				<span className={"icon" + (visibleMenu ? " rotated" : "")} />
			</div>
			
			{
				visibleMenu && items &&
				<ul className="select-menu container">
					{
						items.map((value, index) => (
							<li className="select-text" onClick={() => onSelectItem(index)}
								key={`${value.id}_${index}`}>
								{value.name}
							</li>))
					}
				</ul>
			}
		</div>
	);
}

export default Select;