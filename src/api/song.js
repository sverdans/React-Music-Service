import { $authHost } from "./index";

export const createSong = async (formData) =>
{
	const { data } = await $authHost.post("api/song/create", formData);
	return data;
}

export const changeSong = async (id, formData) =>
{
	const { data } = await $authHost.put("api/song/change/" + id, formData);
	return data;
}

export const deleteSong = async (id) => 
{
	const { data } = await $authHost.delete("api/song/delete/" + id);
	return data;
}