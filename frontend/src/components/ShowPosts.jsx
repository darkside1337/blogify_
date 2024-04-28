import { useState } from "react";
import { useEffect } from "react";
import BlogpostCard from "./ui/BlogpostCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorAlert from "./ui/ErrorAlert";
import { axiosInstance as axios } from "src/api/axios";
const ShowPosts = () => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    document.title = "Posts";
  }, []);

  useEffect(() => {
    const getPublicPosts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const response = await axios.get("/posts/public");

        if (response.status === 200) {
          setPublicPosts(response.data.posts);
          console.log(response.data.posts);
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPublicPosts();
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center mb-16">Blogposts: </h1>
      <div>
        <div>
          {isLoading && <LoadingSpinner />}

          {errorMessage && <ErrorAlert message={errorMessage} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicPosts.length !== 0 ? (
            publicPosts.map((post) => {
              return (
                <BlogpostCard
                  // title, body, postId, createdAt
                  key={post._id}
                  postId={post._id}
                  title={post.title}
                  body={post.postPreview}
                  createdAt={post.createdAt}
                />
              );
            })
          ) : (
            <p className="text-sm text-center">There are no posts!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPosts;
