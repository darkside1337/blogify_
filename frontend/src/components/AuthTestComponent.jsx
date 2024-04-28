import useAuth from "src/hooks/useAuth";
import MaxWidthWrapper from "./MaxWidthWrapper";
const AuthTestComponent = () => {
  const { isAuthenticated, isAdmin, dispatch, username } = useAuth();

  return (
    <div>
      <MaxWidthWrapper>
        <p>Welcome, {username}</p>
        <p>Is Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
        <p>Is Admin: {isAdmin ? "Yes" : "No"}</p>
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Logout
        </button>
        <hr />
        <h1>TEST</h1>
        <article class="prose lg:prose-xl"></article>
      </MaxWidthWrapper>
    </div>
  );
};

export default AuthTestComponent;
