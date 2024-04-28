import { Link } from "react-router-dom";

const SuccessAlert = ({ message }) => {
  return (
    <div role="alert" className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="max-w[275px]">
        {message} <br />
        <span>You'll be redirected to the login page in 5 seconds</span>
        <br />
        <span>
          <Link to="/auth/login" className="link">
            Login Here!
          </Link>
        </span>
      </span>
    </div>
  );
};

export default SuccessAlert;
