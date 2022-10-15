const initialState = {
	user: null,
	likes: [],
	playlists: []
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				user: action.payload.user,
				likes: action.payload.likes,
				playlists: action.payload.playlists
			};
		
		case "UPDATE_USER":
			return {
				...state,
				user: action.payload.user
			};
		
		case "CLEAR_USER":
			return initialState;
		
		case "ADD_LIKE":
			{
				const array = state.likes.concat([action.payload.songId]);
				
				return {
					...state,
					likes: array
				}
			}

		case "REMOVE_LIKE":
			{
				const array = state.likes.filter(value => value != action.payload.songId);

				return {
					...state,
					likes: array
				}
			}
	
		case "ADD_PLAYLIST":
			{
				const array = state.playlists.concat([{
					id: action.payload.id,
					name: action.payload.name,
					userId: action.payload.userId
				}]);

				return {
					...state,
					playlists: array
				}
			}

		case "DELETE_PLAYLIST":
			{
				const array = state.playlists.filter(value => value.id != action.payload.playlistId);
				
				return {
					...state,
					playlists: array
				}
			}

		case "UPDATE_PLAYLIST":
			{
				const array = state.playlists.map(value => {
					if (value.id == action.payload.id)
						return {
							...value,
							name: action.payload.name
						}
					return value;
				});
				
				return {
					...state,
					playlists: array
				}
			}

		default:
			return state;
	}
}

export default userReducer;