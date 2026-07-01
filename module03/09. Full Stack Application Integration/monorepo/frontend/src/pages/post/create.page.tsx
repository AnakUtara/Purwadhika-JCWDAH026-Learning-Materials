import useLoading from "@/hooks/use-loading";
import LoadingPage from "../loading";

const CreatePostPage = () => {
	const isLoading = useLoading();

	if (isLoading) {
		return <LoadingPage />;
	}

	return <div>CreatePostPage</div>;
};
export default CreatePostPage;
