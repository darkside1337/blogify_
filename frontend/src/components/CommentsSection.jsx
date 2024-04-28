import { useState } from "react";
import { useParams } from "react-router-dom";
import SuccessAlertMessage from "./ui/SuccessAlertMessage";
import { axiosInstance as axios, axiosInstance } from "src/api/axios";
import ErrorAlert from "./ui/ErrorAlert";
import useAuth from "src/hooks/useAuth";
import moment from "moment";
import UserProfilePicture from "./ui/UserProfilePicture";
import { ThumbsUp } from "lucide-react";
import useThemeContext from "src/hooks/UseThemeContext";

//

const CommentInput = ({ setComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const { postId } = useParams();
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { accessToken } = useAuth();

  const postComment = async (e) => {
    e.preventDefault();
    try {
      setIsPosting(true);
      setError(false);
      setSuccessMessage(false);
      const response = await axios.post(
        "/comments",
        {
          body: commentBody,
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setComments((prevComments) => [response.data.comment, ...prevComments]);
      }

      setIsPosting(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form
      className="w-full px-4 py-8 flex flex-col gap-8"
      onSubmit={postComment}
    >
      <div>
        {successMessage && <SuccessAlertMessage message={successMessage} />}
        {error && <ErrorAlert message={error} />}
      </div>

      <textarea
        className="textarea textarea-bordered  min-h-32 w-[80%] mx-auto"
        placeholder="Type your comment here!"
        required
        minLength={3}
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
      ></textarea>
      <div className="w-full flex justify-center">
        <button disabled={isPosting} type="submit" className="btn btn-primary">
          Post
        </button>
      </div>
    </form>
  );
};
const Comment = ({
  postedBy,
  likeCount,
  body,
  createdAt,
  id,
  setComments,
  likes,
}) => {
  const { currentTheme } = useThemeContext();

  const { _id: currentUser, accessToken } = useAuth();

  const { isAdmin, _id } = useAuth();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isSending, setIsSending] = useState(false);

  const [userAlreadyLikedComment, setUserAlreadyLikedComment] = useState(
    likes.includes(_id)
  );

  const deleteComment = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSending(true);
    try {
      const response = await axios.delete(`/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setSuccessMessage(response.data.message);

        setComments((prevComments) => {
          const filteredComments = prevComments.filter(
            (comment) => comment._id !== id
          );

          return filteredComments;
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
    } finally {
      setIsSending(false);
    }
  };

  const handleLikeDislike = async () => {
    if (userAlreadyLikedComment) {
      try {
        const response = await axios.put(
          `/comments/${id}/dislike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setComments((prevComments) => {
            const refreshedComments = prevComments.map((comment) => {
              if (comment._id === id) {
                return {
                  ...comment,
                  likeCount: comment.likeCount - 1, // Decrease like count
                  likes: comment.likes.filter(
                    (like) => like.$oid !== currentUser
                  ), // Remove current user from likes
                };
              } else return comment;
            });
            return refreshedComments;
          });
          setUserAlreadyLikedComment(false); // Set liked state to false
          console.log("UnlikedMessage");
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } else {
      try {
        const response = await axios.put(
          `/comments/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setComments((prevComments) => {
            const refreshedComments = prevComments.map((comment) => {
              if (comment._id === id) {
                return {
                  ...comment,
                  likeCount: comment.likeCount + 1,
                  likes: [...comment.likes, { $oid: currentUser }],
                };
              } else return comment;
            });
            return refreshedComments;
          });
          setUserAlreadyLikedComment(true);
          console.log("LikedMessage");
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  console.log(likes.includes(_id));
  return (
    <div
      className={`w-full h-full shadow-lg flex gap-2 flex-col md:flex-row min-h-32  px-4 py-8 rounded-xl ${
        currentTheme === "emerald" ? "bg-neutral-content" : "bg-neutral"
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-2 min-w-7">
        <UserProfilePicture username={postedBy} />
        <p>{postedBy}</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center flex-1">
        <p>{body}</p>
        <p className="text-sm">
          {moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <div className="flex gap-4 justify-center items-center px-4 py-8 ">
        <button className="cursor-pointer">
          <ThumbsUp
            size={30}
            onClick={handleLikeDislike}
            fill={userAlreadyLikedComment ? "DodgerBlue" : "currentColor"} // Conditional fill prop
            strokeWidth={userAlreadyLikedComment ? "1.5" : "2"}
            stroke={userAlreadyLikedComment ? "black" : undefined}
          />
        </button>
        <p> {likeCount}</p>
      </div>
      {/* if user is an admin, or the user himself posted the comment, show delete button */}
      {isAdmin || _id === id ? (
        <button
          className="btn btn-error max-w-fit mx-auto md:my-auto"
          disabled={isSending}
          onClick={deleteComment}
        >
          DELETE
        </button>
      ) : null}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {successMessage && <SuccessAlertMessage message={successMessage} />}
    </div>
  );
};
const CommentsSection = ({ comments, setComments }) => {
  return (
    <div className="w-full flex flex-col gap-8 mt-8">
      <CommentInput setComments={setComments} />
      <hr />
      <div className="flex flex-col gap-8">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              id={comment._id}
              postedBy={comment.postedBy.username}
              likeCount={comment.likeCount}
              createdAt={comment.createdAt}
              body={comment.body}
              setComments={setComments}
              likes={comment.likes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
