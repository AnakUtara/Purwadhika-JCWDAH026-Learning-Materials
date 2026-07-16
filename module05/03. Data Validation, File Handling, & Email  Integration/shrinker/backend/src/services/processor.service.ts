import sharp from "sharp";

class ProcessorService {
	async compressImage(
		file: Express.Multer.File,
		shrinkLevel: "low" | "medium" | "high",
	): Promise<Buffer> {
		const { mimetype, buffer } = file;
		const ext = mimetype.split("/")[1];

		return await sharp(buffer)
			.rotate()
			.toFormat(ext as keyof sharp.FormatEnum, {
				quality: (() => {
					switch (shrinkLevel) {
						case "low":
							return 80;
						case "medium":
							return 50;
						case "high":
							return 20;
						default:
							return 80;
					}
				})(),
			})
			.toBuffer();
	}

	changeFilename(originalName: string, suffix: string) {
		const ext =
			originalName.lastIndexOf(".") !== -1
				? originalName.slice(originalName.lastIndexOf("."))
				: "";
		const base =
			originalName.lastIndexOf(".") !== -1
				? originalName.slice(0, originalName.lastIndexOf("."))
				: originalName;
		return `${base}${suffix}${ext}`;
	}
}

export default ProcessorService;
