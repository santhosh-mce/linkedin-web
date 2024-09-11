import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import toast from "react-hot-toast";

const PostPage = () => {
	const { postId } = useParams();
	const { data: authUser, isError: isAuthUserError } = useQuery({ queryKey: ["authUser"] });
	const { data: post, isLoading, isError: isPostError } = useQuery({
		queryKey: ["post", postId],
		queryFn: () => axiosInstance.get(`/posts/${postId}`),
	});

	if (isLoading) return <div>Loading post...</div>;
	if (isPostError) {
		toast.error("Failed to load post. Please try again later.");
		return <div>Post not found</div>;
	}

	if (!post?.data) return <div>Post not found</div>;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-3'>
				<Post post={post.data} />
			</div>
		</div>
	);
};
export default PostPage;
