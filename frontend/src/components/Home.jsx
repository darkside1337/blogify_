import useThemeContext from "src/hooks/UseThemeContext";
import MaxWidthWrapper from "./MaxWidthWrapper";
import CoffeDoodle from "src/assets/CoffeeDoddle.svg";
import CoffeDoodleDark from "src/assets/CoffeeDoddle-dark.svg";
import useAuth from "src/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance as axios } from "src/api/axios";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorAlert from "./ui/ErrorAlert";
import BlogpostCard from "./ui/BlogpostCard";
const Home = () => {
  useEffect(() => {
    document.title = "Blogify_ 🚀";
  }, []);

  const { currentTheme } = useThemeContext();

  const { isAuthenticated, username } = useAuth();

  const [publicPosts, setPublicPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <section className="text-base text-justify mt-8">
      <MaxWidthWrapper>
        <div className="flex flex-col gap-8 md:flex-row justify-center items-center mb-32">
          {currentTheme === "emerald" ? (
            <img
              src={CoffeDoodle}
              alt="Hero image"
              className="max-w-[498px] ml-8 md:ml-0"
            />
          ) : (
            <img
              src={CoffeDoodleDark}
              alt="Hero image"
              className="max-w-[498px] ml-8 md:ml-0"
            />
          )}

          <div className="text-center ">
            <h1 className="text-8xl mb-6">Blogify_</h1>
            <h3 className="text-3xl">
              {isAuthenticated ? (
                <span className="text-secondary">{username}'s </span>
              ) : (
                "Your "
              )}
              favorite <span>blog</span>
            </h3>
          </div>
        </div>

        <hr className="w-full mb-16" />

        <div className="flex justify-center items-center">
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
      </MaxWidthWrapper>
    </section>
  );
};

export default Home;
