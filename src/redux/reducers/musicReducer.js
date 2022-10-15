import { Howl } from "howler";

const initialState =
{
	playlist: null,
	song: null,
	audio: null,
	isPause: true,
};

const changeSong = (state, src) => {
	let audio = state.audio;
				
	if (audio)
		state.audio.unload();

	audio = new Howl({
		src: src,
		html5: true,
	});
	
	audio.play();
	return audio;
};

const musicReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PLAYLIST_SONG":
			{
				const audio = changeSong(state, action.payload.song.audio);
				return {
					...state,
					playlist: action.payload.playlist,
					song: action.payload.song,
					audio: audio,
					isPause: false,
					currentPos: 0
				};
			}
		case "SET_IS_PAUSE":
			{
				action.payload.isPause ? state.audio.pause() : state.audio.play();
				return {
					...state,
					isPause: action.payload.isPause
				}
			}
		case "SET_PREV_SONG":
			{
				if (!state.playlist)
					return initialState;
				
				const time = state.audio.seek();
				if (time < 3) {
					let index = state.playlist.songs.findIndex(value => value.id === state.song.id);
					if (index === 0) index = state.playlist.songs.length;
	
					const prevSong = state.playlist.songs[(index - 1)];
	
					const audio = changeSong(state, prevSong.audio);
	
					return {
						...state,
						song: prevSong,
						isPause: false,
						audio: audio
					}
				}
				else {
					
					state.audio.seek(0);
					return state;
				}
			
			}
		case "SET_NEXT_SONG":
			{
				if (!state.playlist)
					return initialState;
				
				const index = state.playlist.songs.findIndex(value => value.id === state.song.id);

				const nextSong = state.playlist.songs[(index + 1) % state.playlist.songs.length];
				
				const audio = changeSong(state, nextSong.audio);

				return {
					...state,
					song: nextSong,
					isPause: false,
					audio: audio
				}
			}
		case "SET_SONG_TIME":
			{
				if (!state.audio)
					return initialState;
				
				state.audio.seek(action.payload.percent / 100 * state.audio._duration);
				return state;
			}
		case "CLEAR_MUSIC":
			{
				if (state.audio)
					state.audio.unload();
				return initialState;
			}
		default:
			return state;
	}
}

export default musicReducer;