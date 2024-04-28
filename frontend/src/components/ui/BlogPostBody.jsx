import parse from "html-react-parser";
import LikeBlogpostButton from "./LikeBlogpostButton";
import { axiosInstance as axios } from "src/api/axios";
import useAuth from "src/hooks/useAuth";
import { useState } from "react";
import ErrorAlert from "./ErrorAlert";
const BlogPostBody = ({ blogpost, setCurrentPost }) => {
  //

  const { _id: currentUser, accessToken } = useAuth();
  const [userAlreadyLikedPost, setUserAlreadyLikedPost] = useState(
    blogpost.likes.some((user) => user._id === currentUser)
  );
  console.log(blogpost);
  const [errorMessage, setErrorMessage] = useState("");

  // like, dislike

  const handleLikeUnlikePost = async () => {
    if (userAlreadyLikedPost) {
      try {
        const response = await axios.put(
          `/posts/${blogpost._id}/dislike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setCurrentPost((prevCurrentPost) => ({
            ...prevCurrentPost,
            likeCount: prevCurrentPost.likeCount - 1,
            likes: prevCurrentPost.likes.filter(
              (like) => like.$oid !== currentUser
            ),
          }));
          setUserAlreadyLikedPost(false);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(
          error.response ? error.response.data.error : "An error occurred."
        );
      }
    } else {
      try {
        const response = await axios.put(
          `/posts/${blogpost._id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setCurrentPost((prevCurrentPost) => ({
            ...prevCurrentPost,
            likeCount: prevCurrentPost.likeCount + 1,
            likes: [...prevCurrentPost.likes, { $oid: currentUser }],
          }));
          setUserAlreadyLikedPost(true);
        }
      } catch (error) {
        setErrorMessage(
          error.response ? error.response.data.error : "An error occurred."
        );
        console.log(error);
      }
    }
  };

  return (
    <div className="mb-16">
      <h1 className="mb-8 text-center text-3xl ">{blogpost?.title}</h1>
      {parse(blogpost?.body)}
      <div className="w-full min-w-full flex justify-center items-center mt-8 gap-8">
        {blogpost?.likeCount}

        <LikeBlogpostButton
          liked={userAlreadyLikedPost}
          onClick={handleLikeUnlikePost}
        />
        {errorMessage && <ErrorAlert message={errorMessage} />}
      </div>
    </div>
  );
};

export default BlogPostBody;
