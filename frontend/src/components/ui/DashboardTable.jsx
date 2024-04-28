import moment from "moment";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeletePostModal from "./DeletePostModal";
import { useEffect } from "react";

const DashboardTable = ({ posts, setPosts }) => {
  const navigate = useNavigate();
  const [selectedPostId, setSelectedPostId] = useState(undefined);
  const [postTitle, setPostTitle] = useState("");
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const navigateToPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const navigateToUpdatePost = (postId) => {
    navigate(`/admin/posts/${postId}/update`);
  };

  useEffect(() => {
    if (selectedPostId !== undefined) {
      const post = posts.find((post) => post._id === selectedPostId);
      if (post) {
        setPostTitle(post.title);
      }
    }
  }, [selectedPostId, posts]);

  const handleDeleteModal = (postId) => {
    setSelectedPostId(postId);
    setDeleteModalStatus(!deleteModalStatus);
  };

  return (
    <div className="overflow-x-auto">
      <DeletePostModal
        isOpen={deleteModalStatus}
        postTitle={postTitle}
        setDeleteModalStatus={setDeleteModalStatus}
        postId={selectedPostId}
        setPosts={setPosts}
        posts={posts}
      />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>title</th>
            <th>description</th>
            <th>Published at</th>
            <th>Updated At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {posts.length === 0 ? (
            <tr className="bg-base-200">
              <th colSpan={7}>Oops... You have no posts</th>
            </tr>
          ) : (
            posts.map((post, i) => (
              <tr key={i} className="bg-base-200 max-h-20 md:min-h-40">
                <th>{i}</th>
                <td className="max-w-[160px]">{post.title}</td>
                <td>{post.postPreview}</td>
                <td>{moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>{moment(post.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>{post.isPublic ? "Public" : "Private"}</td>
                <td className=" flex gap-4 w-full min-w-40 min-h-52 items-center justify-center h-full">
                  <button
                    onClick={() => {
                      navigateToPost(post._id);
                    }}
                    className="btn btn-primary"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      navigateToUpdatePost(post._id);
                    }}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      handleDeleteModal(post._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
