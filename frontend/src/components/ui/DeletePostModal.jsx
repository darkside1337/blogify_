import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance as axios } from "src/api/axios";
import useAuth from "src/hooks/useAuth";

const DeletePostModal = ({
  isOpen,
  postTitle,
  posts,
  setDeleteModalStatus,
  postId,
  setPosts,
}) => {
  const { accessToken } = useAuth();
  const [isDeletedSuccessfully, setIsDeletedSuccessFully] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(false);
  const navigate = useNavigate();
  let timeoutId;

  useEffect(() => {
    if (isDeletedSuccessfully) {
      timeoutId = setTimeout(() => {
        setDeleteModalStatus(false);

        navigate("/admin/dashboard");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isDeletedSuccessfully, timeoutId]);

  const handleDeletPost = async () => {
    setIsDeletedSuccessFully(false);
    setErrorDeleting(false);

    try {
      const response = await axios.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setIsDeletedSuccessFully(true);
        const updatedPosts = posts.filter((post) => post._id !== postId);
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log(error);
      setErrorDeleting(true);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box flex flex-col">
        <form method="dialog ">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => {
              e.preventDefault();
              setDeleteModalStatus(false);
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Warning!</h3>
        <p className="py-4">
          Are you sure you want to delete the following post :
        </p>
        <p>{postTitle && postTitle}</p>
        {isDeletedSuccessfully && (
          <p className="bg-success px-2 py-2 mt-4 text-success-content rounded-md">
            Post deleted successfully!
          </p>
        )}
        {errorDeleting && (
          <p className="bg-error px-2 py-2 mt-4 text-error-content rounded-md">
            Error Deleting post!
          </p>
        )}
        <button
          className="btn btn-error mt-8  w-fit mx-auto"
          onClick={handleDeletPost}
          disabled={isDeletedSuccessfully}
        >
          Confirm
        </button>
      </div>
    </dialog>
  );
};

export default DeletePostModal;
