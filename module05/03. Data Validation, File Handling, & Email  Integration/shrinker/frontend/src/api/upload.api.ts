import api from "../libs/axios";

export const singleImageUploader = async (
	file: File,
): Promise<{
	message: string;
	data: object;
}> => {
	const formData = new FormData();
	formData.append("file", file);
	const res = await api.post("/storage/image", formData);
	return res.data;
};
