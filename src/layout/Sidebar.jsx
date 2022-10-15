import React from "react";
import { NavLink } from "react-router-dom";
import { ACCOUNT_ROUTE, AUTHORIZATION_ROUTE, HOME_ROUTE, LIBRARY_ROUTE, SEARCH_ROUTE, SETTINGS_ROUTE } from "../utils/constants";
import { useSelector } from 'react-redux';

const sidebarWide = "180px";
const sidebarNarrow = "50px";

const Sidebar = () => {

	const { user } = useSelector(({ userReducer }) => userReducer);
	const { song } = useSelector(({ musicReducer }) => musicReducer);
	const [isClose, setIsClose] = React.useState(false);
	
	const onHamburgerClick = () => {
		const newIsClose = !isClose;
		document.documentElement.style.setProperty("--sidebar-width", newIsClose ? sidebarNarrow : sidebarWide);
		setIsClose(newIsClose);
	}

	return (
		<nav className={"sidebar container" + (isClose ? " close" : "")}
			style={{
				height: (
					song ?
						"calc(100% - 20px - 91px - 32px - var(--sidebar-width))"
						:
						"calc(100% - 20px)"
				)
			}}>
			<div className="sidebar-header">
				<div className="icon hamburger-icon" onClick={onHamburgerClick} />
			</div>
			<ul>
				<NavLink to={user ? ACCOUNT_ROUTE : AUTHORIZATION_ROUTE} title="Аккаунт" className="nav-link">
					<div className="icon-wrapper">
						<div className="icon account-icon" />
					</div>
					<span className="sidebar-text">Аккаунт</span>
				</NavLink>
				
				<hr noshade="noshade" />

				<NavLink to={SEARCH_ROUTE} title="Поиск" className="nav-link disabled">
					<div className="icon-wrapper">
						<div className="icon search-icon" />
					</div>
					<span className="sidebar-text">Поиск</span>
				</NavLink>
			
				<NavLink to={HOME_ROUTE} title="Главная" className="nav-link">
					<div className="icon-wrapper">
						<div className="icon home-icon" />
					</div>
					<span className="sidebar-text">Главная</span>
				</NavLink>
				
				<NavLink to={LIBRARY_ROUTE} title="Медиатека" className={"nav-link " + (user ? "" : "disabled")} >
					<div className="icon-wrapper">
						<div className="icon library-icon" />
					</div>
					<span className="sidebar-text">Медиатека</span>
				</NavLink>

				<hr noshade="noshade" />
				
				<NavLink to={SETTINGS_ROUTE} title="Настройки" className="nav-link">
					<div className="icon-wrapper">
						<div className="icon settings-icon" />
					</div>
					<span className="sidebar-text">Настройки</span>
				</NavLink>
			</ul>
		</nav>
	);
}

export default Sidebar;