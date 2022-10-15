export const setPlaylistSong = (playlist, song) => ({
	type: "SET_PLAYLIST_SONG",
	payload: {
		playlist,
		song,
	}
});

export const setIsPause = (isPause) => ({
	type: "SET_IS_PAUSE",
	payload: { isPause }
});

export const setPrevSong = () => ({
	type: "SET_PREV_SONG",
	payload: {}
});

export const setNextSong = () => ({
	type: "SET_NEXT_SONG",
	payload: {}
});

export const setSongTime = (percent) => ({
	type: "SET_SONG_TIME",
	payload: { percent }
});

export const clearMusic = () => ({
	type: "CLEAR_MUSIC",
	payload: {}
})
