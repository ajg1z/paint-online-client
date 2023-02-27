import { $api } from "config/axios";

export const saveImage = async (image: string, roomId: string) => {
	const { data } = await $api.post("room/image", { image, roomId });
	return data;
};

export const getImage = async (roomId: string) => {
	const { data } = await $api.get(`room/image/${roomId}`);
	return data;
};
