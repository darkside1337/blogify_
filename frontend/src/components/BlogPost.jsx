import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { axiosInstance as axios } from "src/api/axios";
import useAuth from "src/hooks/useAuth";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useNavigate } from "react-router-dom";
import BlogPostBody from "./ui/BlogPostBody";
import LoadingSpinner from "./ui/LoadingSpinner";
import CommentsSection from "./CommentsSection";
const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    document.title = currentPost.title || "BlogPost🚀";
  }, []);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);

        if (response.status === 200) {
          setCurrentPost(response.data.post);
          console.log(response.data.post);
          setComments(response.data.post.comments);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response);
        setErrorMessage(response.response.data.error);
      }
    };
    console.log(currentPost.body);
    fetchCurrentPost();
  }, [postId]);

  return (
    <div>
      <MaxWidthWrapper>
        {isAdmin && (
          <div className="w-full flex justify-center items-center mb-8">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/admin/posts/${postId}/update`)}
            >
              EDIT POST
            </button>
          </div>
        )}

        {Object.keys(currentPost).length !== 0 ? (
          <>
            <BlogPostBody
              blogpost={currentPost}
              setCurrentPost={setCurrentPost}
            />
            <hr />
            <CommentsSection comments={comments} setComments={setComments} />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default BlogPost;
