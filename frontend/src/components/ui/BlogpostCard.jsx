import { useNavigate } from "react-router-dom";

const BlogpostCard = ({ title, body, postId, createdAt }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/posts/${postId}`);

  return (
    <div className="card w-96 bg-base-100 shadow-xl overflow-x-hidden">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{body}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleNavigate}>
            Read more!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogpostCard;
