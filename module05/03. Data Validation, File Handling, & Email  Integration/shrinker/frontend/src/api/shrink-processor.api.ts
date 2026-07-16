import api from "../libs/axios";
import { CompressionFormType } from "../validators/file.validator";

export const imageShrinkingProcessor = async (data: CompressionFormType) => {
	if (!data.file) throw new Error("File is required");
	const formData = new FormData();
	formData.append("file", data.file);
	formData.append("shrinkLevel", data.shrinkLevel);
	formData.append("email", data.email);
	await api.post("/processor/image", formData);
};
