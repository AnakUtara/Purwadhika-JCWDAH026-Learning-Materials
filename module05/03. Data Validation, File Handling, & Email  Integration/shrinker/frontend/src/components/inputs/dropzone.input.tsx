import { FileInput, Label } from "flowbite-react";
import { ErrorMessage, useField } from "formik";

type Props = {
	label?: string;
	description?: string;
	maxSizeInMB?: number;
	disabled?: boolean;
	onFileChange: (file: File) => void;
};

const DropzoneInput = ({
	label = "file",
	description = "SVG, PNG, JPG or GIF",
	maxSizeInMB = 10,
	disabled = false,
	onFileChange,
}: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, { touched, error }] = useField(label);
	const isError = touched && error;

	return (
		<div className="w-full">
			<Label
				htmlFor={label}
				disabled={disabled}
				className={`flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed ${
					disabled ? "" : "transition-colors cursor-pointer"
				} ${
					disabled
						? "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
						: isError
							? "border-red-500 bg-red-50 hover:bg-red-100 dark:border-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30"
							: "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				}`}
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<svg
						className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span> or drag and
						drop
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						{description} (MAX. {maxSizeInMB})
					</p>
				</div>
				<FileInput
					id={label}
					className="hidden"
					disabled={disabled}
					onChange={(e) =>
						e.target.files?.[0] ? onFileChange(e.target.files?.[0]) : null
					}
				/>
			</Label>
			<ErrorMessage name={label}>
				{(msg) => (
					<p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
						{msg}
					</p>
				)}
			</ErrorMessage>
		</div>
	);
};
export default DropzoneInput;
