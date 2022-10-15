import {
	Home,
	Authorization,
	Settings,
	Account,
	Search,
	Library,
	Playlist,
	Category,
	User
} from "./pages"

import {
	HOME_ROUTE,
	AUTHORIZATION_ROUTE,
	SETTINGS_ROUTE,
	ACCOUNT_ROUTE,
	SEARCH_ROUTE,
	LIBRARY_ROUTE,
	PLAYLIST_ROUTE,
	USER_ROTE,
	CATEGORY_ROUTE
} from "./utils/constants"

export const authRoutes = [
	{
		path: ACCOUNT_ROUTE,
		Component: Account
	},
	{
		path: LIBRARY_ROUTE,
		Component: Library
	}
]

export const publicRoutes = [
	{
		path: AUTHORIZATION_ROUTE,
		Component: Authorization
	},
	{
		path: SETTINGS_ROUTE,
		Component: Settings
	},
	{
		path: HOME_ROUTE,
		Component: Home
	},
	{
		path: SEARCH_ROUTE,
		Component: Search
	},
	{
		path: PLAYLIST_ROUTE + '/:id',
		Component: Playlist
	},
	{
		path: USER_ROTE + '/:id',
		Component: User
	},
	{
		path: CATEGORY_ROUTE,
		Component: Category
	}
]