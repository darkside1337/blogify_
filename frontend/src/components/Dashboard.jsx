import { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import DashboardTable from "./ui/DashboardTable";
import { axiosInstance as axios } from "src/api/axios";
import useAuth from "src/hooks/useAuth";
import { useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorAlert from "./ui/ErrorAlert";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data.posts);
        console.log(response.data.posts);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [accessToken]);

  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-center mb-8">
        <button
          className="w-fit btn btn-primary"
          onClick={() => navigate("/admin/posts/create")}
        >
          Create Post
        </button>
      </div>

      <div className="w-full flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DashboardTable posts={posts} setPosts={setPosts} />
        )}

        {error && <ErrorAlert message={error} />}
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
