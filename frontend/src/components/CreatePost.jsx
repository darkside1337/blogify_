import React from "react";
const API_KEY = import.meta.env.VITE_TINY_API_KEY;
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { axiosInstance as axios } from "src/api/axios";
import useAuth from "src/hooks/useAuth";
import ErrorAlert from "./ui/ErrorAlert";
import SuccessAlertMessage from "./ui/SuccessAlertMessage";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useEffect } from "react";

const CreatePost = () => {
  const [editorContent, setEditorContent] = useState(undefined);
  const [postTitle, setPostTitle] = useState("");
  const [postPreview, setPostPreview] = useState("");
  const [postedSuccessfullyMessage, setPostedSuccessfullyMessage] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* console.log(postTitle); */
  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };
  const [isPublic, setIsPublic] = useState(true);
  const handlePostStatus = (e) => {
    if (e.target.checked) {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  };

  const { accessToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPostedSuccessfullyMessage("");
    setErrorMessage("");

    // request
    try {
      const response = await axios.post(
        "/posts",
        {
          title: postTitle,
          body: editorContent,
          postPreview,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setIsLoading(false);

      setPostedSuccessfullyMessage(response.data.message);
    } catch (error) {
      /*   console.log(error); */
      setIsLoading(false);

      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    document.title = "Create Post";
  }, []);

  return (
    <div>
      <MaxWidthWrapper>
        <div className="max-w-[276px] mb-8 mx-auto">
          {isLoading && <LoadingSpinner />}

          {errorMessage && <ErrorAlert message={errorMessage} />}

          {postedSuccessfullyMessage && (
            <SuccessAlertMessage message={postedSuccessfullyMessage} />
          )}
        </div>
        <form className="px-4 md:px-16" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center flex-col gap-4 mb-4">
            <p>Post title:</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              required
              minLength="3"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>

          <label className="form-control max-w-[276px] md:max-w-96 w-full mx-auto mb-8">
            <div className="label">
              <span className="label-text">Post preview:</span>
            </div>
            <textarea
              required
              maxLength={428}
              minLength={3}
              className="textarea textarea-bordered h-24  min-h-60"
              placeholder=" Please write a small preview for your post. This will appear in the blog post card and will provide a description (or a preview) for your post."
              value={postPreview}
              onChange={(e) => setPostPreview(e.target.value)}
            ></textarea>
          </label>

          <Editor
            apiKey={API_KEY}
            init={{
              selector: "textarea", // change this value according to your HTML
              skin:
                localStorage.getItem("theme") === "night"
                  ? "oxide-dark"
                  : "snow",
              content_css:
                localStorage.getItem("theme") === "night" ? "dark" : "default",
              height: 548,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],

              branding: false,
              mobile: {
                menubar: true,
              },
            }}
            initialValue="Start typing your Blog Post Here!"
            onEditorChange={handleEditorChange}
          />
          <div className="flex flex-col gap-2 w-fit mx-auto justify-center items-center mt-4">
            <div>Post status :{isPublic ? " Public" : " Hidden"}</div>
            <input
              type="checkbox"
              className="toggle"
              onChange={handlePostStatus}
              checked={isPublic}
            />
            <button className="btn btn-primary mt-2">Submit</button>
          </div>
        </form>
      </MaxWidthWrapper>
    </div>
  );
};

export default CreatePost;
