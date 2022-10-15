import { $authHost, $host } from "./index";

export const createPlaylist = async (name) =>
{
	const { data } = await $authHost.post("api/playlist/create", { name });
	return data;
}

export const getPlaylist = async (id) =>
{
	const { data } = await $host.get("api/playlist/get/" + id);
	return data;
}

export const deletePlaylist = async (id) =>
{
	const { data } = await $authHost.delete("api/playlist/delete/" + id);
	return data;
}

export const changePlaylist = async (id, formData) =>
{
	const { data } = await $authHost.put("api/playlist/change/" + id, formData);
	return data;
}

export const addInLiked = async (songId) => 
{
	const { data } = await $authHost.put("api/playlist/like", { songId });
	return data;
}

export const removeFromLiked = async (songId) => 
{
	const { data } = await $authHost.put("api/playlist/unlike", { songId });
	return data;
}

export const addSong = async (playlistId, songId) => 
{
	const { data } = await $authHost.put("api/playlist/addSong", { playlistId, songId });
	return data;
}

export const removeSong = async (playlistId, songId) => 
{
	const { data } = await $authHost.put("api/playlist/removeSong", { playlistId, songId });
	return data;
}

export const getAllPlaylists = async () =>
{
	const { data } = await $host.get("api/playlist/getAll");
	return data;
}