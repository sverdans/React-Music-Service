import { React, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { Sidebar, Content, Player } from "./layout";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "./redux/actions/user";
import { check } from "./api/user";

const App = () => {
	
	const theme = useSelector(({ themeReducer }) => themeReducer.theme);
	const user = useSelector(({ userReducer }) => userReducer.user);
	const dispatch = useDispatch();

	useEffect(() => {
		check().then(data => {
			dispatch(setUser(data));
		});
	}, []);

	return (
		<div className={theme}>
			<Sidebar />
			<Content>
				<Routes>
					{
						user &&
						authRoutes.map(({ path, Component }) =>
							<Route key={path} path={path} element={<Component />} />)
					}

					{
						publicRoutes.map(({ path, Component }) =>
							<Route key={path} path={path} element={<Component />} />)
					}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Content>
			<Player />
		</div>
	);
}

export default App;