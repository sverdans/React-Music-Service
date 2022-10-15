export const setUser = ({ user, likes = [], playlists = [] }) => ({
	type: "SET_USER",
	payload: { user, likes, playlists }
});

export const clearUser = () => ({
	type: "CLEAR_USER",
});

export const updateUser = ({ user }) => ({
	type: "UPDATE_USER",
	payload: { user }
});

export const addLike = (songId) => ({
	type: "ADD_LIKE",
	payload: { songId }
});

export const removeLike = (songId) => ({
	type: "REMOVE_LIKE",
	payload: { songId }
});

export const addPlaylist = ({ name, id, userId }) => ({
	type: "ADD_PLAYLIST",
	payload: {
		name,
		id,
		userId
	}
});

export const removePlaylist = (playlistId) => ({
	type: "DELETE_PLAYLIST",
	payload: { playlistId }
});

export const updatePlaylist = ({ name, id }) => ({
	type: "UPDATE_PLAYLIST",
	payload: {
		name,
		id
	}
});
