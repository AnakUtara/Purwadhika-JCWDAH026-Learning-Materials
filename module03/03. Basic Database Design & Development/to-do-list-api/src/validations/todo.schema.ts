import Yup from "../libs/yup.js";

const createToDoSchema = Yup.object().shape({
	title: Yup.string()
		.min(1, "Title must be at least 1 character long")
		.required("Title is required"),
	isDone: Yup.boolean(),
});

const updateToDoSchema = Yup.object().shape({
	title: Yup.string().min(1, "Title must be at least 1 character long"),
	isDone: Yup.boolean(),
});

export { createToDoSchema, updateToDoSchema };
