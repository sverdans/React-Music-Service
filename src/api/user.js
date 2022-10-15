import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";

export const registration = async (name, email, password, repeatedPassword) =>
{
	const { data } = await $host.post("api/user/registration", { name, email, password, repeatedPassword });
	localStorage.setItem('token', data.token);
	return { user: jwt_decode(data.token) };
}

export const login = async (email, password) =>
{
	const { data } = await $host.post("api/user/login", { email, password });
	localStorage.setItem('token', data.token);
	return {
		user: jwt_decode(data.token),
		likes: data.likes,
		playlists: data.playlists 
	};
}

export const check = async () =>
{
	const { data } = await $authHost.get("api/user/check");
	localStorage.setItem('token', data.token);

	return {
		user: jwt_decode(data.token),
		likes: data.likes,
		playlists: data.playlists 
	};
}

export const change = async (formData) =>
{
	const { data } = await $authHost.put("api/user/change", formData);
	localStorage.setItem('token', data.token);
	return { user: jwt_decode(data.token) };
}

export const getLibrary = async () =>
{
	const { data } = await $authHost.get("api/user/library");
	return data;
}

export const getUser = async (id) =>
{
	const { data } = await $host.get("api/user/getUser/" + id);
	return data;
} 

export const addPlaylistToLiked = async (playlistId) =>
{
	const { data } = await $authHost.put("api/user/addPlaylist", { playlistId });
	return data;
}

export const removePlaylistFromLiked = async (playlistId) =>
{
	const { data } = await $authHost.put("api/user/removePlaylist", { playlistId });
	return data;
}