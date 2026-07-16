import buildUploader from "../factories/build-uploader.factory.js";

export const imageUploader = (limit: number = 1.5) => {
	return buildUploader(
		["image/png", "image/jpeg", "image/webp", "image/gif"],
		limit,
	);
};

export const docUploader = (limit: number = 2.5) =>
	buildUploader(
		[
			"text/plain",
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.ms-powerpoint",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		],
		limit,
	);
