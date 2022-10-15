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
	
    const onDropdownItem = (index) => {

    }
    
	return (
		<>
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
		</>
	);
}

export default Select;